import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send, Users, MapPin, Instagram, GraduationCap, Phone, Mail } from "lucide-react";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh"
];

const popularColleges = [
  "IIT Delhi", "IIT Bombay", "IIT Madras", "IIT Kanpur", "IIT Kharagpur", "IIT Roorkee",
  "IIT Guwahati", "IIT Hyderabad", "NIT Trichy", "NIT Warangal", "NIT Surathkal",
  "BITS Pilani", "BITS Goa", "BITS Hyderabad", "Delhi University", "JNU Delhi",
  "Jamia Millia Islamia", "Anna University", "VIT Vellore", "Manipal University",
  "SRM University", "Amity University", "Lovely Professional University", "Other"
];

interface FormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  collegeName: string;
  customCollege: string;
  collegeCity: string;
  state: string;
  instagramProfile: string;
  interestedInLeading: string;
  whyJoinXplorevo: string;
  isPartOfClub: string;
  clubName: string;
  roleInClub: string;
}

export function CampusConnectForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    mobileNumber: "",
    email: "",
    collegeName: "",
    customCollege: "",
    collegeCity: "",
    state: "",
    instagramProfile: "",
    interestedInLeading: "",
    whyJoinXplorevo: "",
    isPartOfClub: "",
    clubName: "",
    roleInClub: ""
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      const requiredFields = ['fullName', 'mobileNumber', 'email', 'collegeCity', 'state', 'interestedInLeading', 'whyJoinXplorevo', 'isPartOfClub'];
      const collegeName = formData.collegeName === 'Other' ? formData.customCollege : formData.collegeName;
      
      if (!collegeName) requiredFields.push('collegeName');

      // Email validation
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Mobile number validation (Indian format)
      const mobileRegex = /^[6-9][0-9]{9}$/;
      if (formData.mobileNumber && !mobileRegex.test(formData.mobileNumber)) {
        toast({
          title: "Invalid Mobile Number",
          description: "Please enter a valid 10-digit Indian mobile number",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      for (const field of requiredFields) {
        if (!formData[field as keyof FormData]) {
          toast({
            title: "Missing Information",
            description: `Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Additional validation for club fields
      if (formData.isPartOfClub === 'yes' && (!formData.clubName || !formData.roleInClub)) {
        toast({
          title: "Please provide club details",
          description: "Club name and role are required when you're part of a club",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Prepare data for Supabase
      const submissionData = {
        full_name: formData.fullName,
        mobile_number: formData.mobileNumber,
        email: formData.email,
        college_name: collegeName,
        college_city: formData.collegeCity,
        state: formData.state,
        instagram_profile: formData.instagramProfile.startsWith('@') 
          ? formData.instagramProfile 
          : formData.instagramProfile ? `@${formData.instagramProfile}` : '',
        interested_in_leading: formData.interestedInLeading === 'yes',
        why_join_xplorevo: formData.whyJoinXplorevo,
        is_part_of_club: formData.isPartOfClub === 'yes',
        club_name: formData.isPartOfClub === 'yes' ? formData.clubName : null,
        role_in_club: formData.isPartOfClub === 'yes' ? formData.roleInClub : null,
      };

      // Store data in Supabase
      const { data, error } = await supabase
        .from('campus_connect_submissions')
        .insert([submissionData])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Failed to submit application');
      }

      console.log('✅ Successfully submitted to Supabase:', data);

      toast({
        title: "🎉 Application Submitted!",
        description: "Welcome to Xplorevo Campus Connect! We'll contact you soon.",
      });

      // Reset form
      setFormData({
        fullName: "",
        mobileNumber: "",
        email: "",
        collegeName: "",
        customCollege: "",
        collegeCity: "",
        state: "",
        instagramProfile: "",
        interestedInLeading: "",
        whyJoinXplorevo: "",
        isPartOfClub: "",
        clubName: "",
        roleInClub: ""
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-[var(--xplorevo-card-shadow)] border-primary/20">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
          <Users className="h-6 w-6" />
          Join Campus Connect
        </CardTitle>
        <CardDescription className="text-base">
          Be part of India's fastest-growing youth travel community
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Full Name *
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="rounded-xl border-primary/30 focus:ring-primary"
            />
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <Label htmlFor="mobileNumber" className="text-sm font-medium flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Mobile Number *
            </Label>
            <Input
              id="mobileNumber"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={formData.mobileNumber}
              onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
              className="rounded-xl border-primary/30 focus:ring-primary"
              maxLength={10}
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="rounded-xl border-primary/30 focus:ring-primary"
            />
          </div>

          {/* College Name */}
          <div className="space-y-2">
            <Label htmlFor="collegeName" className="text-sm font-medium">
              College Name *
            </Label>
            <Select 
              value={formData.collegeName} 
              onValueChange={(value) => handleInputChange('collegeName', value)}
            >
              <SelectTrigger className="rounded-xl border-primary/30">
                <SelectValue placeholder="Select your college" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {popularColleges.map((college) => (
                  <SelectItem key={college} value={college}>
                    {college}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom College Input */}
          {formData.collegeName === 'Other' && (
            <div className="space-y-2">
              <Label htmlFor="customCollege" className="text-sm font-medium">
                College Name *
              </Label>
              <Input
                id="customCollege"
                type="text"
                placeholder="Enter your college name"
                value={formData.customCollege}
                onChange={(e) => handleInputChange('customCollege', e.target.value)}
                className="rounded-xl border-primary/30 focus:ring-primary"
              />
            </div>
          )}

          {/* College City */}
          <div className="space-y-2">
            <Label htmlFor="collegeCity" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              College City *
            </Label>
            <Input
              id="collegeCity"
              type="text"
              placeholder="Enter your college city"
              value={formData.collegeCity}
              onChange={(e) => handleInputChange('collegeCity', e.target.value)}
              className="rounded-xl border-primary/30 focus:ring-primary"
            />
          </div>

          {/* State */}
          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm font-medium">
              State *
            </Label>
            <Select 
              value={formData.state} 
              onValueChange={(value) => handleInputChange('state', value)}
            >
              <SelectTrigger className="rounded-xl border-primary/30">
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Instagram Profile */}
          <div className="space-y-2">
            <Label htmlFor="instagram" className="text-sm font-medium flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              Instagram Profile (Optional)
            </Label>
            <Input
              id="instagram"
              type="text"
              placeholder="@yourusername or profile link"
              value={formData.instagramProfile}
              onChange={(e) => handleInputChange('instagramProfile', e.target.value)}
              className="rounded-xl border-primary/30 focus:ring-primary"
            />
          </div>

          {/* Interest in Leading */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Are you interested in leading Xplorevo activities? *
            </Label>
            <RadioGroup
              value={formData.interestedInLeading}
              onValueChange={(value) => handleInputChange('interestedInLeading', value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="font-normal">Yes, I'm excited to lead!</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="maybe" id="maybe" />
                <Label htmlFor="maybe" className="font-normal">Maybe, I'd like to learn more</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="font-normal">No, I prefer to participate</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Why Join Xplorevo */}
          <div className="space-y-2">
            <Label htmlFor="whyJoinXplorevo" className="text-sm font-medium">
              6. Why do you want to be a part of Xplorevo Campus Connect? *
            </Label>
            <p className="text-xs text-muted-foreground mb-2">
              Share in a few lines what excites you about joining this program.
            </p>
            <Textarea
              id="whyJoinXplorevo"
              placeholder="Tell us what excites you about joining Xplorevo Campus Connect..."
              value={formData.whyJoinXplorevo}
              onChange={(e) => handleInputChange('whyJoinXplorevo', e.target.value)}
              className="min-h-[100px] rounded-xl border-primary/30 focus:ring-primary"
            />
          </div>

          {/* Club Participation */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              7. Are you currently part of any college club or activity group? *
            </Label>
            <RadioGroup
              value={formData.isPartOfClub}
              onValueChange={(value) => handleInputChange('isPartOfClub', value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="club-yes" />
                <Label htmlFor="club-yes" className="font-normal">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="club-no" />
                <Label htmlFor="club-no" className="font-normal">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Conditional Club Details */}
          {formData.isPartOfClub === 'yes' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clubName" className="text-sm font-medium">
                  Which club/group? *
                </Label>
                <Input
                  id="clubName"
                  type="text"
                  placeholder="Enter club or group name"
                  value={formData.clubName}
                  onChange={(e) => handleInputChange('clubName', e.target.value)}
                  className="rounded-xl border-primary/30 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roleInClub" className="text-sm font-medium">
                  Your role in the club? *
                </Label>
                <Input
                  id="roleInClub"
                  type="text"
                  placeholder="e.g., Member, Secretary, President"
                  value={formData.roleInClub}
                  onChange={(e) => handleInputChange('roleInClub', e.target.value)}
                  className="rounded-xl border-primary/30 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-primary hover:bg-primary-dark text-primary-foreground font-semibold py-3 text-base transition-all duration-200 shadow-[var(--xplorevo-soft-shadow)]"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Join Campus Connect
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}