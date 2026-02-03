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
      <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Detailed insights and performance metrics.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <metric.icon className="h-5 w-5 text-primary shrink-0" />
                  <span className="flex items-center text-xs text-emerald-500 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {metric.change}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold tracking-tight">{metric.value}</p>
                  <p className="text-sm text-muted-foreground truncate">{metric.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-lg sm:text-xl">Traffic Overview</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Visitor statistics for the past 30 days</CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-6">
              <div className="h-48 sm:h-64 flex items-center justify-center rounded-lg bg-muted border border-dashed border-border">
                <div className="text-center px-4">
                  <BarChart3 className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground font-medium">Chart visualization</p>
                  <p className="text-xs text-muted-foreground/70">Data is refreshing in real-time</p>
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
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">Geographic Distribution</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-6">
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { country: 'United States', visitors: '45.2K', flag: '🇺🇸' },
                { country: 'United Kingdom', visitors: '12.8K', flag: '🇬🇧' },
                { country: 'Germany', visitors: '8.4K', flag: '🇩🇪' },
                { country: 'Canada', visitors: '6.1K', flag: '🇨🇦' },
              ].map((item) => (
                <div
                  key={item.country}
                  className="flex items-center gap-3 rounded-xl border border-border p-3 sm:p-4 hover:bg-accent/50 transition-all active:scale-[0.98]"
                >
                  <span className="text-xl sm:text-2xl shrink-0" role="img" aria-label={item.country}>{item.flag}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{item.country}</p>
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