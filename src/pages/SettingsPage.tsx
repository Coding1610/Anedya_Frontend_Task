import { motion } from 'framer-motion';
import { 
  Bell, 
  Lock,  
  Palette,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const settingSections = [
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Manage your notification preferences',
    icon: Bell,
    settings: [
      { label: 'Email notifications', description: 'Receive updates via email', enabled: true },
      { label: 'Push notifications', description: 'Get notified in your browser', enabled: false },
      { label: 'Weekly digest', description: 'Summary of your activity', enabled: true },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Protect your account',
    icon: Lock,
    settings: [
      { label: 'Two-factor authentication', description: 'Add an extra layer of security', enabled: false },
      { label: 'Session alerts', description: 'Get notified of new logins', enabled: true },
    ],
  },
];

const SettingsPage = () => {
  
  const { isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid gap-6">
          
          {/* Theme Element */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            >
            <Card className="overflow-hidden">
              <CardHeader className="border-b bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Appearance</CardTitle>
                    <CardDescription>Customize how the app looks</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-6 transition-colors hover:bg-muted/30">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">
                      Toggle between light and dark themes
                    </p>
                  </div>
                  <Switch 
                    checked={theme === 'dark'} 
                    onCheckedChange={toggleTheme}
                    />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Basic Element */}
          {settingSections.map((section, sectionIdx) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (sectionIdx + 1) * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="border-b bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="divide-y divide-border p-0">
                  {section.settings.map((setting) => (
                    <div
                      key={setting.label}
                      className="flex items-center justify-between p-6 transition-colors hover:bg-muted/30"
                      >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{setting.label}</p>
                        <p className="text-xs text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch defaultChecked={setting.enabled} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}

        </div>
      </div>
    </>
  );
};

export default SettingsPage;