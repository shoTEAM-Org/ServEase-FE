import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import {
  ArrowLeft,
  Building2,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  FileText,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  CheckCircle,
  XCircle,
  ZoomIn,
  AlertCircle,
  Calendar,
  Shield,
  Send,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

// Mock data for pending applications
const mockApplications = {
  "APP-2026-0234": {
    applicationId: "APP-2026-0234",
    providerId: "SE-ED-003",
    businessName: "Tutor Excellence Hub",
    ownerName: "Roberto Miguel Cruz",
    serviceCategory: "Education & Professional Services",
    businessDescription:
      "Tutor Excellence Hub provides comprehensive educational support services including private tutoring for K-12 students, test preparation for college entrance exams, professional skill development workshops, and career counseling. Our team of experienced educators is committed to helping students achieve their academic goals through personalized learning approaches and proven teaching methodologies.",
    businessType: "physical",
    businessAddress: {
      street: "789 BGC Central",
      barangay: "Fort Bonifacio",
      city: "Taguig City",
      province: "Metro Manila",
      zipCode: "1634",
    },
    services: [
      "Private tutoring for Math, Science, and English",
      "College entrance exam preparation (UPCAT, ACET, DLSUCET)",
      "Professional development workshops",
      "Career counseling and guidance",
      "Online and in-person learning options",
    ],
    workingHours: {
      monday: { isOpen: true, startTime: "09:00", endTime: "20:00" },
      tuesday: { isOpen: true, startTime: "09:00", endTime: "20:00" },
      wednesday: { isOpen: true, startTime: "09:00", endTime: "20:00" },
      thursday: { isOpen: true, startTime: "09:00", endTime: "20:00" },
      friday: { isOpen: true, startTime: "09:00", endTime: "20:00" },
      saturday: { isOpen: true, startTime: "10:00", endTime: "18:00" },
      sunday: { isOpen: true, startTime: "13:00", endTime: "17:00" },
    },
    contactInfo: {
      phoneNumber: "+63 917 234 5678",
      email: "contact@tutorexcellence.ph",
      website: "https://tutorexcellence.ph",
    },
    socialMedia: {
      facebook: "https://facebook.com/tutorexcellencehub",
      instagram: "https://instagram.com/tutorexcellence",
      twitter: "",
      linkedin: "https://linkedin.com/company/tutor-excellence-hub",
    },
    businessPermit: {
      fileName: "business-permit-tutor-2026.pdf",
      fileUrl: "https://images.unsplash.com/photo-1554224311-beee460c201f?w=800&q=80",
      verificationStatus: "pending",
      uploadedDate: "2026-03-01",
      permitNumber: "BPT-2026-00234567",
      registeredBusinessName: "Tutor Excellence Hub Educational Services Inc.",
      issueDate: "2026-02-15",
      expiryDate: "2027-02-15",
      verificationChecklist: {
        businessNameMatch: true,
        permitValid: true,
        addressMatch: true,
        categoryMatch: true,
      },
      documentStatus: "pending",
    },
    approvalStatus: "pending",
    dateApplied: "2026-03-01",
  },
};

export function ApprovalQueueDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPermitModal, setShowPermitModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

  // Get application data based on id
  const application = mockApplications[id as keyof typeof mockApplications];

  if (!application) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Application Not Found</h2>
          <p className="text-gray-500 mt-2">The requested application could not be found.</p>
          <Button
            variant="outline"
            onClick={() => navigate("/approval-queue")}
            className="mt-4"
          >
            Back to Approval Queue
          </Button>
        </div>
      </div>
    );
  }

  const getDocumentStatusBadge = (status: string) => {
    if (status === "verified") {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Verified
        </Badge>
      );
    }
    if (status === "pending") {
      return (
        <Badge className="bg-amber-100 text-amber-700 border-amber-200">
          <Clock className="w-3 h-3 mr-1" />
          Pending Verification
        </Badge>
      );
    }
    if (status === "needs-clarification") {
      return (
        <Badge className="bg-amber-100 text-amber-700 border-amber-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          Needs Clarification
        </Badge>
      );
    }
    if (status === "invalid") {
      return (
        <Badge className="bg-red-100 text-red-700 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Invalid
        </Badge>
      );
    }
    return null;
  };

  const handleApprove = () => {
    console.log("Approving application:", id);
    setShowApproveModal(false);
    // Add actual API call here
  };

  const handleReject = () => {
    console.log("Rejecting application:", id);
    setShowRejectModal(false);
    // Add actual API call here
  };

  const handleRequestInfo = () => {
    console.log("Requesting info for application:", id);
    setShowRequestInfoModal(false);
    // Add actual API call here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/approval-queue")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Approval Queue
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Application Review
            </h1>
            <p className="text-gray-500 mt-1">
              Application ID: <span className="font-mono">{application.applicationId}</span>
            </p>
          </div>
        </div>
        <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-lg px-4 py-2">
          <Clock className="w-4 h-4 mr-2" />
          Pending Review
        </Badge>
      </div>

      {/* Basic Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Basic Business Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Business Name
              </label>
              <p className="text-gray-900 mt-1">{application.businessName}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Owner Name
              </label>
              <p className="text-gray-900 mt-1">{application.ownerName}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Selected Service Category
              </label>
              <p className="text-gray-900 mt-1">{application.serviceCategory}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Date Applied
              </label>
              <p className="text-gray-900 mt-1">
                {new Date(application.dateApplied).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Business Description
            </label>
            <p className="text-gray-900 mt-1 leading-relaxed">
              {application.businessDescription}
            </p>
          </div>

          <div className="border-t pt-4">
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Business Address
            </label>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Physical Location
                  </p>
                  <p className="text-gray-900 mt-1">
                    {application.businessAddress.street}, Barangay{" "}
                    {application.businessAddress.barangay}
                    <br />
                    {application.businessAddress.city},{" "}
                    {application.businessAddress.province}{" "}
                    {application.businessAddress.zipCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Service Description
          </label>
          <p className="text-gray-900 leading-relaxed">
            {application.services.join(". ")}
          </p>
        </CardContent>
      </Card>

      {/* Working Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Working Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(application.workingHours).map(([day, schedule]) => (
              <div
                key={day}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <span className="font-medium text-gray-700 capitalize w-32">
                  {day}
                </span>
                {schedule.isOpen ? (
                  <div className="flex items-center gap-4">
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      Open
                    </Badge>
                    <span className="text-gray-900 font-mono">
                      {schedule.startTime} - {schedule.endTime}
                    </span>
                  </div>
                ) : (
                  <Badge className="bg-gray-100 text-gray-600 border-gray-200">
                    Closed
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <p className="text-gray-900 mt-1">
                  {application.contactInfo.phoneNumber}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <p className="text-gray-900 mt-1">
                  {application.contactInfo.email}
                </p>
              </div>
            </div>

            {application.contactInfo.website && (
              <div className="flex items-start gap-3 md:col-span-2">
                <Globe className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Website
                  </label>
                  <a
                    href={application.contactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mt-1 block"
                  >
                    {application.contactInfo.website}
                  </a>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Social Media Presence */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Presence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {application.socialMedia.facebook && (
              <div className="flex items-start gap-3">
                <Facebook className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Facebook
                  </label>
                  <a
                    href={application.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mt-1 block text-sm"
                  >
                    {application.socialMedia.facebook}
                  </a>
                </div>
              </div>
            )}

            {application.socialMedia.instagram && (
              <div className="flex items-start gap-3">
                <Instagram className="w-5 h-5 text-pink-600 mt-0.5" />
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Instagram
                  </label>
                  <a
                    href={application.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mt-1 block text-sm"
                  >
                    {application.socialMedia.instagram}
                  </a>
                </div>
              </div>
            )}

            {application.socialMedia.twitter && (
              <div className="flex items-start gap-3">
                <Twitter className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Twitter/X
                  </label>
                  <a
                    href={application.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mt-1 block text-sm"
                  >
                    {application.socialMedia.twitter}
                  </a>
                </div>
              </div>
            )}

            {application.socialMedia.linkedin && (
              <div className="flex items-start gap-3">
                <Linkedin className="w-5 h-5 text-blue-700 mt-0.5" />
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    LinkedIn
                  </label>
                  <a
                    href={application.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mt-1 block text-sm"
                  >
                    {application.socialMedia.linkedin}
                  </a>
                </div>
              </div>
            )}

            {!application.socialMedia.facebook &&
              !application.socialMedia.instagram &&
              !application.socialMedia.twitter &&
              !application.socialMedia.linkedin && (
                <p className="text-gray-500 text-sm col-span-2">
                  No social media links provided
                </p>
              )}
          </div>
        </CardContent>
      </Card>

      {/* Business Permit */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Business Permit & Documents Verification
            </CardTitle>
            {getDocumentStatusBadge(application.businessPermit.documentStatus)}
          </div>
        </CardHeader>
        <CardContent>
          {application.businessPermit.fileUrl ? (
            <div className="space-y-6">
              {/* Image Preview */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Uploaded Business Permit
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 relative group">
                  <img
                    src={application.businessPermit.fileUrl}
                    alt="Business Permit"
                    className="w-full max-w-md mx-auto rounded cursor-pointer hover:opacity-90 transition"
                    onClick={() => setShowPermitModal(true)}
                  />
                  <button
                    onClick={() => setShowPermitModal(true)}
                    className="absolute top-6 right-6 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition"
                    title="Click to enlarge"
                  >
                    <ZoomIn className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                <div className="text-center mt-2">
                  <p className="text-sm text-gray-600">
                    File: <span className="font-mono">{application.businessPermit.fileName}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Uploaded on{" "}
                    {new Date(application.businessPermit.uploadedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Permit Details */}
              <div className="border-t pt-6">
                <label className="text-sm font-semibold text-gray-700 mb-4 block">
                  Permit Details
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Permit Number
                      </label>
                      <p className="text-gray-900 mt-1 font-mono">
                        {application.businessPermit.permitNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Registered Business Name
                      </label>
                      <p className="text-gray-900 mt-1">
                        {application.businessPermit.registeredBusinessName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Issue Date
                      </label>
                      <p className="text-gray-900 mt-1">
                        {new Date(application.businessPermit.issueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Expiry Date
                      </label>
                      <p className="text-gray-900 mt-1">
                        {new Date(application.businessPermit.expiryDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Checklist */}
              <div className="border-t pt-6">
                <label className="text-sm font-semibold text-gray-700 mb-4 block">
                  Verification Checklist
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Business Name matches application</span>
                    {application.businessPermit.verificationChecklist.businessNameMatch ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 border-red-200">
                        <XCircle className="w-3 h-3 mr-1" />
                        Failed
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Permit is valid and not expired</span>
                    {application.businessPermit.verificationChecklist.permitValid ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 border-red-200">
                        <XCircle className="w-3 h-3 mr-1" />
                        Failed
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Address matches submitted address</span>
                    {application.businessPermit.verificationChecklist.addressMatch ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 border-red-200">
                        <XCircle className="w-3 h-3 mr-1" />
                        Failed
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Category matches permit scope</span>
                    {application.businessPermit.verificationChecklist.categoryMatch ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 border-red-200">
                        <XCircle className="w-3 h-3 mr-1" />
                        Failed
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>No Business Permit Uploaded</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Application Approval</h3>
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                Pending Review
              </Badge>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700 gap-2 flex-1"
                onClick={() => setShowApproveModal(true)}
              >
                <CheckCircle className="w-4 h-4" />
                Approve Application
              </Button>
              <Button
                variant="outline"
                className="gap-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 flex-1"
                onClick={() => setShowRequestInfoModal(true)}
              >
                <AlertCircle className="w-4 h-4" />
                Request More Information
              </Button>
              <Button
                variant="outline"
                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 flex-1"
                onClick={() => setShowRejectModal(true)}
              >
                <XCircle className="w-4 h-4" />
                Reject Application
              </Button>
            </div>

            <div className="border-t pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/approval-queue")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Approval Queue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Permit Enlarge Modal */}
      <Dialog open={showPermitModal} onOpenChange={setShowPermitModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Business Permit - {application.businessPermit.fileName}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <img
              src={application.businessPermit.fileUrl}
              alt="Business Permit"
              className="w-full rounded"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Approve Modal */}
      <Dialog open={showApproveModal} onOpenChange={setShowApproveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Approve Application
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to approve <strong>{application.businessName}</strong>?
              The provider will be granted access to the platform and can start accepting bookings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>Once approved:</strong>
              </p>
              <ul className="text-sm text-green-700 mt-2 space-y-1 list-disc list-inside">
                <li>Provider will be moved to the Service Providers list</li>
                <li>Status will change to "Approved"</li>
                <li>Provider can accept customer bookings</li>
                <li>Email notification will be sent to the provider</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveModal(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={handleApprove}
            >
              Confirm Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              Reject Application
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting <strong>{application.businessName}</strong>'s application.
              This will be sent to the provider.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Rejection Reason <span className="text-red-600">*</span>
              </label>
              <Textarea
                placeholder="Enter the reason for rejection (e.g., Incomplete documents, Invalid business permit, etc.)"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={5}
                className="resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 10 characters required
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                <strong>Note:</strong> This action will permanently reject the application and notify the provider.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowRejectModal(false);
              setRejectionReason("");
            }}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={rejectionReason.length < 10}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request More Information Modal */}
      <Dialog open={showRequestInfoModal} onOpenChange={setShowRequestInfoModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-amber-600" />
              Request More Information
            </DialogTitle>
            <DialogDescription>
              Send a message to <strong>{application.businessName}</strong> requesting additional information or clarification.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Message to Provider <span className="text-amber-600">*</span>
              </label>
              <Textarea
                placeholder="Enter your message (e.g., Please upload a clearer copy of your business permit, Please provide proof of business address, etc.)"
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 20 characters required
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> The provider will receive an email notification with your message and their application will remain in "Pending Review" status.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowRequestInfoModal(false);
              setRequestMessage("");
            }}>
              Cancel
            </Button>
            <Button
              variant="default"
              className="bg-amber-600 hover:bg-amber-700 gap-2"
              onClick={handleRequestInfo}
              disabled={requestMessage.length < 20}
            >
              <Send className="w-4 h-4" />
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
