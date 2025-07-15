import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Download, Users, FileText, Calendar, LogOut, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Submission {
  id: string;
  full_name: string;
  mobile_number: string | null;
  email: string | null;
  college_name: string;
  college_city: string;
  state: string;
  instagram_profile: string | null;
  interested_in_leading: boolean;
  why_join_xplorevo: string;
  is_part_of_club: boolean;
  club_name: string | null;
  role_in_club: string | null;
  submitted_at: string;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem('admin-logged-in');
    if (!isLoggedIn) {
      navigate('/admin/login');
      return;
    }
    
    fetchSubmissions();
    
    // Real-time subscription for new submissions
    const channel = supabase
      .channel('submissions-channel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public', 
        table: 'campus_connect_submissions'
      }, (payload) => {
        console.log('New submission received:', payload);
        setSubmissions(prev => [payload.new as Submission, ...prev]);
        toast({
          title: "New Submission!",
          description: `${payload.new.full_name} just applied`,
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [navigate]);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('campus_connect_submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      setSubmissions(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch submissions",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-logged-in');
    navigate('/admin/login');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const downloadCSV = () => {
    const headers = [
      'Name',
      'Mobile Number',
      'Email',
      'College',
      'City',
      'State',
      'Instagram',
      'Interested in Leading',
      'Why Join Xplorevo',
      'Part of Club',
      'Club Name',
      'Role in Club',
      'Submitted At'
    ];

    const csvContent = [
      headers.join(','),
      ...submissions.map(sub => [
        `"${sub.full_name}"`,
        `"${sub.mobile_number || ''}"`,
        `"${sub.email || ''}"`,
        `"${sub.college_name}"`,
        `"${sub.college_city}"`,
        `"${sub.state}"`,
        `"${sub.instagram_profile || ''}"`,
        sub.interested_in_leading ? 'Yes' : 'No',
        `"${sub.why_join_xplorevo}"`,
        sub.is_part_of_club ? 'Yes' : 'No',
        `"${sub.club_name || ''}"`,
        `"${sub.role_in_club || ''}"`,
        `"${new Date(sub.submitted_at).toLocaleString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xplorevo-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "CSV file downloaded successfully",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading submissions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Xplorevo Campus Connect - Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage and export student applications
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchSubmissions}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leadership Interest</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {submissions.filter(s => s.interested_in_leading).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Club Members</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {submissions.filter(s => s.is_part_of_club).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Button */}
        <div className="mb-6 flex gap-2">
          <Button onClick={downloadCSV} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download CSV Export
          </Button>
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card key={submission.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{submission.full_name}</CardTitle>
                    <CardDescription>
                      {submission.college_name} • {submission.college_city}, {submission.state}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {submission.interested_in_leading && (
                      <Badge variant="secondary">Leadership Interest</Badge>
                    )}
                    {submission.is_part_of_club && (
                      <Badge variant="outline">Club Member</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">
                      Mobile Number:
                    </h4>
                    <p className="text-sm font-mono">{submission.mobile_number || 'Not provided'}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">
                      Email:
                    </h4>
                    <p className="text-sm font-mono">{submission.email || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">
                    Why Join Xplorevo:
                  </h4>
                  <p className="text-sm">{submission.why_join_xplorevo}</p>
                </div>
                
                {submission.is_part_of_club && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">
                      Club Details:
                    </h4>
                    <p className="text-sm">
                      {submission.club_name} - {submission.role_in_club}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>
                    Instagram: {submission.instagram_profile || 'Not provided'}
                  </span>
                  <span>
                    Submitted: {new Date(submission.submitted_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {submissions.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No submissions found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}