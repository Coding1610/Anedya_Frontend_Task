import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, ArrowRight, Fingerprint } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types/auth';

const LoginPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  // login function call using context hook
  const handleLogin = async (role: UserRole) => {
    setSelectedRole(role);
    setIsLoading(true);
    try {
      await login(role);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
      setSelectedRole(null);
    }

  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-background p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 opacity-50" />
        
        <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-[0_0_20px_rgba(var(--primary),0.3)] animate-in zoom-in duration-300">
              <Fingerprint className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="mt-2 text-muted-foreground">
              Select a role to continue to the dashboard
            </p>
          </div>

          <div className="space-y-4">
            {/* admin login card */}
            <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-200">
              <Card 
                className="group cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
                onClick={() => !isLoading && handleLogin('admin')}
                >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
                      <Shield className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">Admin Access</CardTitle>
                      <CardDescription>Full access to all 4 sections</CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:opacity-90"
                    disabled={isLoading}
                    >
                    {isLoading && selectedRole === 'admin' ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      ) : (
                        'Login as Admin'
                        )}
                  </Button>
                </CardContent>
              </Card>
            </div>
            {/* user login card */}
            <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-300">
              <Card 
                className="group cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
                onClick={() => !isLoading && handleLogin('user')}
                >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                      <Users className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">User Access</CardTitle>
                      <CardDescription>Access to 2 sections only</CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    variant="secondary"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading && selectedRole === 'user' ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
                      ) : (
                        'Login as User'
                        )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground animate-in fade-in duration-500 delay-500">
            This is a demo with mock authentication.
            <br />
            Session persists in localStorage.
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;