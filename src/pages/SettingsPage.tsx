import React, { useState } from 'react';
import { Card, CardTitle, CardBody, CardHeader } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Form, FieldWrapper } from '@progress/kendo-react-form';
import { Switch } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Label } from '@progress/kendo-react-labels';
import { Notification } from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';
import Header from '../components/Header';
import '../styles/SettingsPage.css';

const themeOptions = [
  { text: 'Light', value: 'light' },
  { text: 'Dark', value: 'dark' },
  { text: 'System', value: 'system' },
];

const currencyOptions = [
  { text: 'US Dollar (USD)', value: 'USD' },
  { text: 'Euro (EUR)', value: 'EUR' },
  { text: 'British Pound (GBP)', value: 'GBP' },
  { text: 'Japanese Yen (JPY)', value: 'JPY' },
];

interface SettingsFormValues {
  theme: string;
  currency: string;
  notifications: boolean;
  emailAlerts: boolean;
  twoFactorAuth: boolean;
  username: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const SettingsPage: React.FC = () => {
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({ 
    show: false, 
    message: '', 
    type: 'success' 
  });
  
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [settings, setSettings] = useState<SettingsFormValues>({
    theme: 'light',
    currency: 'USD',
    notifications: true,
    emailAlerts: true,
    twoFactorAuth: false,
    username: 'crypto_enthusiast',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    const newNotification = { show: true, message, type };
    setNotification(newNotification);
    setTimeout(() => setNotification({ ...newNotification, show: false }), 3000);
  };

  const handleSubmit = (values: any) => {
    try {
      // In a real app, you would save these settings to your state management or backend
      console.log('Settings saved:', values);
      
      // Reset password fields after submission
      if (showPasswordForm) {
        setSettings(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        setShowPasswordForm(false);
        showNotification('Password updated successfully!', 'success');
      } else {
        showNotification('Settings saved successfully!', 'success');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      showNotification('Failed to save settings. Please try again.', 'error');
    }
    return false; // Prevent default form submission
  };

  const handleUsernameChange = () => {
    // In a real app, you would validate and save the username to your backend
    showNotification('Username updated successfully!', 'success');
  };

  const handleSwitchChange = (field: keyof SettingsFormValues) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSelectChange = (field: keyof SettingsFormValues, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="settings-page">
      <Header />
      <div className="settings-container">
        <h1>Settings</h1>
        <p className="settings-subtitle">Manage your account and preferences</p>
        
        <Form
          onSubmit={handleSubmit}
          initialValues={settings}
          render={(formRenderProps) => (
            <form onSubmit={formRenderProps.onSubmit} className="k-form">
              {/* Account Settings Card - Moved to top */}
              <Card className="settings-card">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardBody>
                  <FieldWrapper>
                    <Label editorId="username">Username</Label>
                    <div className="input-with-button">
                      <input
                        type="text"
                        id="username"
                        value={settings.username}
                        onChange={(e) => handleSelectChange('username', e.target.value)}
                        className="k-textbox"
                        style={{ flex: 1 }}
                      />
                      <Button
                        type="button"
                        themeColor="primary"
                        className="change-button"
                        onClick={handleUsernameChange}
                        disabled={!settings.username.trim()}
                      >
                        Change
                      </Button>
                    </div>
                  </FieldWrapper>

                  <FieldWrapper>
                    <Label>Password</Label>
                    <div className="input-with-button">
                      <input
                        type="password"
                        value="••••••••"
                        disabled
                        className="k-textbox"
                        style={{ flex: 1 }}
                      />
                      <Button
                        type="button"
                        themeColor="primary"
                        className="change-button"
                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                      >
                        {showPasswordForm ? 'Cancel' : 'Change'}
                      </Button>
                    </div>
                  </FieldWrapper>

                  {showPasswordForm && (
                    <div className="password-form">
                      <FieldWrapper>
                        <Label editorId="currentPassword">Current Password</Label>
                        <input
                          type="password"
                          id="currentPassword"
                          value={settings.currentPassword}
                          onChange={(e) => handleSelectChange('currentPassword', e.target.value)}
                          className="k-textbox"
                          style={{ width: '100%' }}
                          placeholder="Enter your current password"
                        />
                      </FieldWrapper>
                      <FieldWrapper>
                        <Label editorId="newPassword">New Password</Label>
                        <input
                          type="password"
                          id="newPassword"
                          value={settings.newPassword}
                          onChange={(e) => handleSelectChange('newPassword', e.target.value)}
                          className="k-textbox"
                          style={{ width: '100%' }}
                          placeholder="Enter your new password"
                        />
                      </FieldWrapper>
                      <FieldWrapper>
                        <Label editorId="confirmPassword">Confirm New Password</Label>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={settings.confirmPassword}
                          onChange={(e) => handleSelectChange('confirmPassword', e.target.value)}
                          className="k-textbox"
                          style={{ width: '100%' }}
                          placeholder="Confirm your new password"
                        />
                      </FieldWrapper>
                      <div className="password-form-actions" style={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        gap: '10px',
                        marginTop: '15px',
                        paddingTop: '10px',
                        borderTop: '1px solid #eee'
                      }}>
                        <Button 
                          type="button" 
                          onClick={() => setShowPasswordForm(false)}
                          className="cancel-button"
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="button" 
                          themeColor="primary"
                          onClick={() => {
                            // Validate and save password
                            if (!settings.currentPassword || !settings.newPassword || !settings.confirmPassword) {
                              showNotification('Please fill in all password fields', 'error');
                              return;
                            }
                            if (settings.newPassword !== settings.confirmPassword) {
                              showNotification('New passwords do not match', 'error');
                              return;
                            }
                            // In a real app, you would save the new password here
                            // For demo purposes, we'll just show a success message and close the form
                            showNotification('Password changed successfully!', 'success');
                            
                            // Reset form fields
                            setSettings(prev => ({
                              ...prev,
                              currentPassword: '',
                              newPassword: '',
                              confirmPassword: ''
                            }));
                            
                            // Close the password form after a short delay
                            setTimeout(() => {
                              setShowPasswordForm(false);
                            }, 500);
                          }}
                          disabled={!settings.currentPassword || !settings.newPassword || !settings.confirmPassword}
                        >
                          Save New Password
                        </Button>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>

              {/* Display Settings Card */}
              <Card className="settings-card">
                <CardHeader>
                  <CardTitle>Display Settings</CardTitle>
                </CardHeader>
            <CardBody>
              <FieldWrapper>
                <Label editorId="theme">Theme</Label>
                <DropDownList
                  id="theme"
                  data={themeOptions}
                  textField="text"
                  dataItemKey="value"
                  value={settings.theme}
                  onChange={(e) => handleSelectChange('theme', e.target.value)}
                />
              </FieldWrapper>
            </CardBody>
          </Card>

          <Card className="settings-card">
            <CardHeader>
              <CardTitle>Currency & Units</CardTitle>
            </CardHeader>
            <CardBody>
              <FieldWrapper>
                <Label editorId="currency">Default Currency</Label>
                <DropDownList
                  id="currency"
                  data={currencyOptions}
                  textField="text"
                  dataItemKey="value"
                  value={settings.currency}
                  onChange={(e) => handleSelectChange('currency', e.target.value)}
                />
              </FieldWrapper>
            </CardBody>
          </Card>

          <Card className="settings-card">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardBody>
              <FieldWrapper>
                <div className="setting-row">
                  <div>
                    <Label editorId="notifications">Enable Notifications</Label>
                    <p className="setting-description">Receive in-app notifications</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={settings.notifications}
                    onChange={() => handleSwitchChange('notifications')}
                  />
                </div>
              </FieldWrapper>

              <FieldWrapper>
                <div className="setting-row">
                  <div>
                    <Label editorId="emailAlerts">Email Alerts</Label>
                    <p className="setting-description">Receive important updates via email</p>
                  </div>
                  <Switch
                    id="emailAlerts"
                    checked={settings.emailAlerts}
                    onChange={() => handleSwitchChange('emailAlerts')}
                    disabled={!settings.notifications}
                  />
                </div>
              </FieldWrapper>
            </CardBody>
          </Card>

          <Card className="settings-card">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardBody>
              <FieldWrapper>
                <div className="setting-row">
                  <div>
                    <Label editorId="twoFactorAuth">Two-Factor Authentication</Label>
                    <p className="setting-description">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onChange={() => handleSwitchChange('twoFactorAuth')}
                  />
                </div>
              </FieldWrapper>
            </CardBody>
          </Card>

          <div className="settings-actions">
            <Button 
              type="button" 
              themeColor="primary" 
              className="save-button"
              onClick={() => setShowSaveDialog(true)}
            >
              Save Changes
            </Button>
            <Button type="button" className="cancel-button">
              Cancel
            </Button>
          </div>
          
          {showSaveDialog && (
            <div className="save-dialog-overlay" style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <div className="save-dialog" style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '400px',
                width: '90%',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
              }}>
                <h3 style={{ marginTop: 0 }}>Save Changes?</h3>
                <p>Are you sure you want to save these changes?</p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px',
                  marginTop: '20px'
                }}>
                  <Button 
                    onClick={() => setShowSaveDialog(false)}
                    className="cancel-button"
                  >
                    Cancel
                  </Button>
                  <Button 
                    themeColor="primary"
                    onClick={(e) => {
                      // Submit the form programmatically
                      const form = e.currentTarget.closest('form');
                      if (form) {
                        form.dispatchEvent(new Event('submit', { cancelable: true }));
                      }
                      setShowSaveDialog(false);
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
            </form>
          )}
        />

        {notification.show && (
          <Notification
            style={{
              position: 'fixed',
              bottom: 20,
              right: 20,
            }}
            type={{ style: notification.type === 'success' ? 'success' : 'error', icon: true }}
          >
            <Fade>
              <div className={`k-notification k-notification-${notification.type}`}>
                <span>{notification.message}</span>
              </div>
            </Fade>
          </Notification>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
