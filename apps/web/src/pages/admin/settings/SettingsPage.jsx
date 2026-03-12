import React from 'react';
import { useState } from 'react';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

const TENANT_TYPES = ['School', 'Society', 'Organization', 'Office'];

export function SettingsPage() {
    const [form, setForm] = useState({
        orgName: 'Acme Corp',
        type: 'Organization',
        email: 'admin@acme.com',
    });
    const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

    return (
        <div className="settings-page anim-fade-in-up">
            {/* Org Settings */}
            <section className="settings-section">
                <div className="settings-section__title">
                    Organization Settings
                </div>
                <div className="settings-section__desc">
                    Update your organization profile and preferences.
                </div>

                <div className="settings-form">
                    <div className="settings-form__row">
                        <Input
                            label="Organization Name"
                            value={form.orgName}
                            onChange={set('orgName')}
                        />
                        <div className="field">
                            <label className="field__label" htmlFor="org-type">
                                Organization Type
                            </label>
                            <select
                                id="org-type"
                                className="field__select"
                                value={form.type}
                                onChange={(e) =>
                                    setForm((p) => ({
                                        ...p,
                                        type: e.target.value,
                                    }))
                                }
                            >
                                {TENANT_TYPES.map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Input
                        label="Admin Email"
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                    />
                    <div>
                        <Button variant="primary" size="md">
                            Save Changes
                        </Button>
                    </div>
                </div>
            </section>

            {/* Notifications */}
            <section className="settings-section">
                <div className="settings-section__title">
                    Notification Preferences
                </div>
                <div className="settings-section__desc">
                    Configure how you receive alerts for visitor activity.
                </div>
                <div
                    style={{
                        color: 'var(--clr-text-muted)',
                        fontSize: '0.9rem',
                    }}
                >
                    Email and SMS notification settings coming soon.
                </div>
            </section>

            {/* Danger Zone */}
            <section className="settings-section settings-danger">
                <div className="settings-section__title">Danger Zone</div>
                <div className="settings-section__desc">
                    These actions are irreversible. Proceed with caution.
                </div>
                <Button variant="danger" size="sm">
                    Delete Organization
                </Button>
            </section>
        </div>
    );
}
