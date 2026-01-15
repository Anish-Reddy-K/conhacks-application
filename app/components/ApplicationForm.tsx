'use client';

import { useActionState, useState } from 'react';
import { submitApplication, ApplicationFormState } from '../actions';
import { countries } from '@/lib/countries';
import { schools } from '@/lib/schools';

interface ApplicationFormProps {
  userEmail: string;
}

async function formAction(
  _prevState: ApplicationFormState,
  formData: FormData
): Promise<ApplicationFormState> {
  return await submitApplication(formData);
}

export function ApplicationForm({ userEmail }: ApplicationFormProps) {
  const [state, action, isPending] = useActionState(formAction, null);
  const [showDietaryOther, setShowDietaryOther] = useState(false);

  const ageOptions = Array.from({ length: 84 }, (_, i) => i + 16);

  // Success state
  if (state?.success) {
    return (
      <div className="success-box">
        <div className="success-icon">✓</div>
        <h2 className="success-title">Application Submitted!</h2>
        <p className="success-text">
          Confirmation will be sent to {userEmail}
        </p>
      </div>
    );
  }

  return (
    <form action={action}>
      {/* Error */}
      {state?.error && (
        <div className="message message-error">{state.error}</div>
      )}

      {/* Personal Info */}
      <div className="section">
        <h2 className="section-title">Personal Information</h2>

        <div className="field">
          <label className="field-label">
            First Name <span className="required">*</span>
          </label>
          <input
            type="text"
            name="first_name"
            placeholder="John"
            className="input"
            required
            disabled={isPending}
          />
          {state?.fieldErrors?.first_name && (
            <p className="field-error">{state.fieldErrors.first_name}</p>
          )}
        </div>

        <div className="field">
          <label className="field-label">
            Last Name <span className="required">*</span>
          </label>
          <input
            type="text"
            name="last_name"
            placeholder="Doe"
            className="input"
            required
            disabled={isPending}
          />
          {state?.fieldErrors?.last_name && (
            <p className="field-error">{state.fieldErrors.last_name}</p>
          )}
        </div>

        <div className="field">
          <label className="field-label">
            Age <span className="required">*</span>
          </label>
          <select name="age" className="select" required disabled={isPending} defaultValue="">
            <option value="" disabled>Select your age</option>
            {ageOptions.map((age) => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
          {state?.fieldErrors?.age && (
            <p className="field-error">{state.fieldErrors.age}</p>
          )}
        </div>

        <div className="field">
          <label className="field-label">
            Phone Number <span className="required">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+1 (555) 123-4567"
            className="input"
            required
            disabled={isPending}
          />
          {state?.fieldErrors?.phone && (
            <p className="field-error">{state.fieldErrors.phone}</p>
          )}
        </div>

        <div className="field">
          <label className="field-label">Email</label>
          <input
            type="email"
            name="email"
            value={userEmail}
            className="input readonly"
            readOnly
          />
          <p className="field-hint">From your account</p>
        </div>

        <div className="field">
          <label className="field-label">
            Country of Residence <span className="required">*</span>
          </label>
          <select name="country" className="select" required disabled={isPending} defaultValue="">
            <option value="" disabled>Select your country</option>
            {countries.map((c) => (
              <option key={c.code} value={c.name}>{c.name}</option>
            ))}
          </select>
          {state?.fieldErrors?.country && (
            <p className="field-error">{state.fieldErrors.country}</p>
          )}
        </div>

        <div className="field">
          <label className="field-label">
            School / College <span className="required">*</span>
          </label>
          <input
            type="text"
            name="school"
            list="schools-list"
            placeholder="Start typing your school..."
            className="input"
            required
            disabled={isPending}
          />
          <datalist id="schools-list">
            {schools.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
          {state?.fieldErrors?.school && (
            <p className="field-error">{state.fieldErrors.school}</p>
          )}
        </div>

        <div className="field">
          <label className="field-label">
            LinkedIn <span className="optional">(optional)</span>
          </label>
          <input
            type="url"
            name="linkedin_url"
            placeholder="https://linkedin.com/in/yourprofile"
            className="input"
            disabled={isPending}
          />
          {state?.fieldErrors?.linkedin_url && (
            <p className="field-error">{state.fieldErrors.linkedin_url}</p>
          )}
        </div>
      </div>

      {/* Dietary Restrictions */}
      <div className="section">
        <h2 className="section-title">Dietary Restrictions</h2>
        <p className="field-hint" style={{ marginBottom: '16px' }}>Select all that apply</p>

        <div className="checkbox-group">
          <label className="checkbox-item">
            <input type="checkbox" name="dietary_vegetarian" disabled={isPending} />
            <span>Vegetarian</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" name="dietary_vegan" disabled={isPending} />
            <span>Vegan</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" name="dietary_gluten_free" disabled={isPending} />
            <span>Gluten-Free</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" name="dietary_halal" disabled={isPending} />
            <span>Halal</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" name="dietary_kosher" disabled={isPending} />
            <span>Kosher</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" name="dietary_nut_allergy" disabled={isPending} />
            <span>Nut Allergy</span>
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              onChange={(e) => setShowDietaryOther(e.target.checked)}
              disabled={isPending}
            />
            <span>Other</span>
          </label>
        </div>

        {showDietaryOther && (
          <div className="field" style={{ marginTop: '12px' }}>
            <input
              type="text"
              name="dietary_other"
              placeholder="Please specify..."
              className="input"
              disabled={isPending}
            />
          </div>
        )}
      </div>

      {/* MLH Agreements */}
      <div className="section">
        <h2 className="section-title">MLH Agreements</h2>

        <div className="checkbox-group">
          <div className="agreement-item">
            <input
              type="checkbox"
              id="mlh_code_of_conduct"
              name="mlh_code_of_conduct"
              required
              disabled={isPending}
            />
            <label htmlFor="mlh_code_of_conduct">
              I have read and agree to the{' '}
              <a href="https://mlh.io/code-of-conduct" target="_blank" rel="noopener noreferrer">
                MLH Code of Conduct
              </a>. <span style={{ color: 'var(--purple)' }}>*</span>
            </label>
          </div>
          {state?.fieldErrors?.mlh_code_of_conduct && (
            <p className="field-error">{state.fieldErrors.mlh_code_of_conduct}</p>
          )}

          <div className="agreement-item">
            <input
              type="checkbox"
              id="mlh_data_sharing"
              name="mlh_data_sharing"
              required
              disabled={isPending}
            />
            <label htmlFor="mlh_data_sharing">
              I authorize you to share my application/registration information with Major League
              Hacking for event administration, ranking, and MLH administration in-line with the{' '}
              <a href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer">
                MLH Privacy Policy
              </a>. I further agree to the{' '}
              <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank" rel="noopener noreferrer">
                MLH Contest Terms
              </a>{' '}
              and{' '}
              <a href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>. <span style={{ color: 'var(--purple)' }}>*</span>
            </label>
          </div>
          {state?.fieldErrors?.mlh_data_sharing && (
            <p className="field-error">{state.fieldErrors.mlh_data_sharing}</p>
          )}

          <div className="agreement-item">
            <input
              type="checkbox"
              id="mlh_email_optin"
              name="mlh_email_optin"
              disabled={isPending}
            />
            <label htmlFor="mlh_email_optin">
              I authorize MLH to send me occasional emails about relevant events, career
              opportunities, and community announcements.
            </label>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-primary" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}
