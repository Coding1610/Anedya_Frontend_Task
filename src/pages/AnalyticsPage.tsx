import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const metrics = [
  { label: 'Page Views', value: '128,432', change: '+12.5%', icon: Globe },
  { label: 'Unique Visitors', value: '34,521', change: '+8.2%', icon: Users },
  { label: 'Conversion Rate', value: '3.24%', change: '+2.1%', icon: TrendingUp },
  { label: 'Avg. Session', value: '4m 32s', change: '+18.7%', icon: BarChart3 },
];

const AnalyticsPage: React.FC = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Detailed insights and performance metrics.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <metric.icon className="h-5 w-5 text-primary" />
                    <span className="flex items-center text-xs text-emerald-500 font-medium">
                      <ArrowUpRight className="h-3 w-3" />
                      {metric.change}
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Visitor statistics for the past 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center rounded-lg bg-muted/50 border border-dashed border-border">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Chart visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { country: 'United States', visitors: '45.2K', flag: '🇺🇸' },
                  { country: 'United Kingdom', visitors: '12.8K', flag: '🇬🇧' },
                  { country: 'Germany', visitors: '8.4K', flag: '🇩🇪' },
                  { country: 'Canada', visitors: '6.1K', flag: '🇨🇦' },
                ].map((item) => (
                  <div
                    key={item.country}
                    className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
                  >
                    <span className="text-2xl" role="img" aria-label={item.country}>{item.flag}</span>
                    <div>
                      <p className="text-sm font-medium">{item.country}</p>
                      <p className="text-xs text-muted-foreground">{item.visitors} visitors</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default AnalyticsPage;