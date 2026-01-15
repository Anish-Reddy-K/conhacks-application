'use server';

import { pb } from '@/lib/pocketbase';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { sendConfirmationEmail } from '@/lib/email';

export type ApplicationFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  id?: string;
} | null;

export async function submitApplication(formData: FormData): Promise<ApplicationFormState> {
  try {
    const { user } = await withAuth({ ensureSignedIn: true });

    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Extract form data
    const firstName = formData.get('first_name') as string;
    const lastName = formData.get('last_name') as string;
    const age = formData.get('age') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const country = formData.get('country') as string;
    const school = formData.get('school') as string;
    const linkedinUrl = formData.get('linkedin_url') as string;
    
    // Dietary restrictions
    const dietaryRestrictions: string[] = [];
    if (formData.get('dietary_vegetarian')) dietaryRestrictions.push('Vegetarian');
    if (formData.get('dietary_vegan')) dietaryRestrictions.push('Vegan');
    if (formData.get('dietary_gluten_free')) dietaryRestrictions.push('Gluten-Free');
    if (formData.get('dietary_halal')) dietaryRestrictions.push('Halal');
    if (formData.get('dietary_kosher')) dietaryRestrictions.push('Kosher');
    if (formData.get('dietary_nut_allergy')) dietaryRestrictions.push('Nut Allergy');
    const dietaryOther = formData.get('dietary_other') as string;
    if (dietaryOther?.trim()) {
      dietaryRestrictions.push(`Other: ${dietaryOther.trim()}`);
    }

    // MLH checkboxes
    const mlhCodeOfConduct = formData.get('mlh_code_of_conduct') === 'on';
    const mlhDataSharing = formData.get('mlh_data_sharing') === 'on';
    const mlhEmailOptin = formData.get('mlh_email_optin') === 'on';

    // Validation
    const fieldErrors: Record<string, string> = {};

    if (!firstName?.trim()) fieldErrors.first_name = 'First name is required';
    if (!lastName?.trim()) fieldErrors.last_name = 'Last name is required';
    if (!age || parseInt(age) < 16 || parseInt(age) > 99) fieldErrors.age = 'Please select a valid age';
    if (!phone?.trim()) fieldErrors.phone = 'Phone number is required';
    if (!email?.trim()) fieldErrors.email = 'Email is required';
    if (!country?.trim()) fieldErrors.country = 'Country is required';
    if (!school?.trim()) fieldErrors.school = 'School is required';
    
    // Validate LinkedIn URL if provided
    if (linkedinUrl?.trim() && !linkedinUrl.includes('linkedin.com')) {
      fieldErrors.linkedin_url = 'Please enter a valid LinkedIn URL';
    }

    // MLH required checkboxes
    if (!mlhCodeOfConduct) fieldErrors.mlh_code_of_conduct = 'You must agree to the MLH Code of Conduct';
    if (!mlhDataSharing) fieldErrors.mlh_data_sharing = 'You must agree to share data with MLH';

    if (Object.keys(fieldErrors).length > 0) {
      return { success: false, error: 'Please fix the errors below', fieldErrors };
    }

    // Create record in PocketBase
    const record = await pb.collection('applications').create({
      workos_user_id: user.id,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      age: parseInt(age),
      phone: phone.trim(),
      email: email.trim(),
      country: country.trim(),
      school: school.trim(),
      linkedin_url: linkedinUrl?.trim() || '',
      dietary_restrictions: dietaryRestrictions,
      mlh_code_of_conduct: mlhCodeOfConduct,
      mlh_data_sharing: mlhDataSharing,
      mlh_email_optin: mlhEmailOptin,
    });

    // Send confirmation email (don't block on failure)
    sendConfirmationEmail({
      to: email.trim(),
      firstName: firstName.trim(),
    }).catch((err) => {
      console.error('Email sending failed:', err);
    });

    return { success: true, id: record.id };
  } catch (error) {
    console.error('Failed to submit application:', error);
    
    // Check for duplicate application
    if (error instanceof Error && error.message.includes('unique')) {
      return { success: false, error: 'You have already submitted an application' };
    }
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to submit application' 
    };
  }
}
