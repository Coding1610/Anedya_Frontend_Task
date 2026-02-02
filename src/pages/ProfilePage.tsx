import { Mail, Phone, MapPin, Calendar, Edit2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const ProfilePage = () => {
  
  const { user } = useAuth();

  return(
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
            <p className="text-muted-foreground">
              Manage your personal information and preferences.
            </p>
          </div>
          <Button variant="outline" className="gap-2 w-fit">
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                    {user?.name.charAt(0)}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{user?.name}</h3>
                  <p className="text-muted-foreground capitalize">{user?.role}</p>
                  <div className="mt-4 flex gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20">
                      Active
                    </span>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground border border-border">
                      Verified
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your account details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Full Name</label>
                    <p className="text-sm font-medium">{user?.name}</p>
                  </div>
                  <div className="space-y-1 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Role</label>
                    <p className="text-sm font-medium capitalize">{user?.role}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-4 rounded-xl border border-border p-4 hover:bg-muted/50 transition-colors group">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 rounded-xl border border-border p-4 hover:bg-muted/50 transition-colors group">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium">+91 96570-73921</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-xl border border-border p-4 hover:bg-muted/50 transition-colors group">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium">India GJ</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-xl border border-border p-4 hover:bg-muted/50 transition-colors group">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Member Since</p>
                      <p className="text-sm font-medium">January 2026</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;