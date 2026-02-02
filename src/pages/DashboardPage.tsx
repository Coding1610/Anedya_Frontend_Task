import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+180.1%',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Sales',
    value: '+12,234',
    change: '+19%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    title: 'Active Sessions',
    value: '573',
    change: '-4%',
    trend: 'down',
    icon: Activity,
  },
];

const DashboardPage: React.FC = () => {
  
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your dashboard today.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500" />
                    )}
                    <span className={stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}>
                      {stat.change}
                    </span>
                    <span>from last month</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Recent Posts (API Data)</CardTitle>
                <CardDescription>Live data from JSONPlaceholder API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-lg p-3 bg-muted/50">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  ))
                ) : error ? (
                  <div className="text-sm text-red-500">{error}</div>
                ) : (
                  posts.slice(0, 4).map((post) => (
                    <div key={post.id} className="flex items-start gap-4 rounded-lg p-3 bg-muted/50">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-sm font-medium shrink-0 shadow-sm">
                        {post.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{post.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{post.body}</p>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
            <Card className="h-max">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used actions</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {['Create Report', 'View Analytics', 'Export Data', 'Send Message'].map((action) => (
                  <button
                    key={action}
                    className="rounded-lg border border-border p-4 text-left hover:bg-accent hover:text-accent-foreground active:scale-95 transition-transform"
                  >
                    <p className="text-sm font-medium">{action}</p>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;