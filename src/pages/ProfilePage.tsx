import { Mail, Phone, MapPin, Calendar, Edit2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const ProfilePage = () => {
  
  const { user } = useAuth();

  return(
    <>
      <div className="space-y-6 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage your personal information and preferences.
            </p>
          </div>
          <Button variant="outline" className="gap-2 w-full sm:w-fit justify-center">
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">    
          
          <div className="lg:col-span-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-2xl sm:text-3xl font-bold shadow-lg">
                    {user?.name?.charAt(0)}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{user?.name}</h3>
                  <p className="text-muted-foreground capitalize text-sm">{user?.role}</p>
                  
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] sm:text-xs font-medium text-primary border border-primary/20">
                      Active
                    </span>
                    <span className="rounded-full bg-muted px-3 py-1 text-[10px] sm:text-xs font-medium text-muted-foreground border border-border">
                      Verified
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <Card>
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl">Personal Information</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Your account details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-4 sm:px-6">
                
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-1 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Full Name</label>
                    <p className="text-sm font-medium truncate">{user?.name}</p>
                  </div>
                  <div className="space-y-1 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Role</label>
                    <p className="text-sm font-medium capitalize">{user?.role}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: Mail, label: "Email", value: user?.email },
                    { icon: Phone, label: "Phone", value: "+91 96570-73921" },
                    { icon: MapPin, label: "Location", value: "India GJ" },
                    { icon: Calendar, label: "Member Since", value: "January 2026" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 sm:gap-4 rounded-xl border border-border p-3 sm:p-4 hover:bg-muted/50 transition-colors group">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                        <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] sm:text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium truncate">{item.value}</p>
                      </div>
                    </div>
                  ))}
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