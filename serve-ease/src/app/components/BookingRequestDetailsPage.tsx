import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  X,
  Star,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F9FAFB",
    padding: "32px",
  },
  maxWidthContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "32px",
  },
  backButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#6B7280",
    marginBottom: "16px",
    padding: "8px 0",
    transition: "color 0.3s ease",
  },
  pageTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#111827",
    letterSpacing: "-0.025em",
    marginBottom: "8px",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  statusBadge: {
    padding: "8px 16px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
    display: "inline-block",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #F3F4F6",
    padding: "24px",
    marginBottom: "24px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "20px",
  },
  timeline: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative" as const,
    marginBottom: "32px",
  },
  timelineLine: {
    position: "absolute" as const,
    top: "20px",
    left: "0",
    right: "0",
    height: "3px",
    backgroundColor: "#E5E7EB",
    zIndex: 0,
  },
  timelineProgress: {
    height: "100%",
    backgroundColor: "#00BF63",
    transition: "width 0.5s ease",
  },
  timelineStep: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    flex: 1,
    zIndex: 1,
  },
  timelineCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    border: "3px solid #E5E7EB",
    marginBottom: "8px",
    transition: "all 0.3s ease",
  },
  timelineLabel: {
    fontSize: "11px",
    fontWeight: "500",
    color: "#9CA3AF",
    textAlign: "center" as const,
  },
  customerSection: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#E5E7EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "600",
    color: "#6B7280",
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "8px",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginBottom: "12px",
  },
  phoneNumber: {
    fontSize: "14px",
    color: "#6B7280",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  primaryButton: {
    backgroundColor: "#00BF63",
    color: "white",
    boxShadow: "0 4px 16px rgba(0, 191, 99, 0.25)",
  },
  secondaryButton: {
    backgroundColor: "white",
    color: "#6B7280",
    border: "1px solid #E5E7EB",
  },
  outlinedButton: {
    backgroundColor: "white",
    color: "#00BF63",
    border: "2px solid #00BF63",
  },
  dangerButton: {
    backgroundColor: "white",
    color: "#DC2626",
    border: "1px solid #FEE2E2",
  },
  detailRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "16px",
    alignItems: "flex-start",
  },
  detailIcon: {
    color: "#9CA3AF",
    marginTop: "2px",
    flexShrink: 0,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: "12px",
    color: "#9CA3AF",
    marginBottom: "4px",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: "14px",
    color: "#374151",
    fontWeight: "500",
  },
  mapPlaceholder: {
    width: "100%",
    height: "200px",
    backgroundColor: "#F3F4F6",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9CA3AF",
    fontSize: "14px",
    marginTop: "12px",
    marginBottom: "12px",
    border: "2px dashed #D1D5DB",
  },
  photoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
    marginTop: "12px",
  },
  photoItem: {
    aspectRatio: "1",
    backgroundColor: "#F3F4F6",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #D1D5DB",
  },
  pricingRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #F3F4F6",
  },
  pricingLabel: {
    fontSize: "14px",
    color: "#6B7280",
  },
  pricingValue: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 0",
    marginTop: "12px",
    borderTop: "2px solid #E5E7EB",
  },
  totalLabel: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827",
  },
  totalValue: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#00BF63",
  },
  actionButtons: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginTop: "24px",
  },
  infoBox: {
    backgroundColor: "#DBEAFE",
    border: "1px solid #93C5FD",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "20px",
    fontSize: "13px",
    color: "#1E3A8A",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },
};

export function BookingRequestDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch based on id
  const request = {
    id: id || "1",
    refNumber: "REQ-2024-001234",
    status: "pending",
    customer: {
      name: "Maria Santos",
      phone: "••• •••• 4567",
      rating: 4.8,
      totalReviews: 24,
    },
    service: {
      type: "Plumbing Repair",
      proposedDate: "March 25, 2024",
      proposedTime: "2:00 PM",
      location: "123 Quezon Ave, Quezon City, Metro Manila",
      description:
        "Kitchen sink is leaking and water pressure is very low. Need urgent repair.",
      instructions: "Please bring extra tools. Building has no elevator.",
      estimatedDuration: "2 hours",
    },
    photos: [
      { id: 1, url: "" },
      { id: 2, url: "" },
    ],
    pricing: {
      serviceFee: 1500,
      platformFee: 150,
      providerEarnings: 1350,
    },
  };

  const timelineSteps = [
    { label: "Requested", status: "completed" },
    { label: "Accepted", status: "pending" },
    { label: "In Progress", status: "pending" },
    { label: "Completed", status: "pending" },
  ];

  const currentStepIndex = timelineSteps.findIndex((s) => s.status === "completed");
  const progressPercentage = (currentStepIndex / (timelineSteps.length - 1)) * 100;

  const getStatusBadgeStyle = (status: string) => {
    const baseStyle = styles.statusBadge;
    switch (status) {
      case "pending":
        return { ...baseStyle, backgroundColor: "#FEF3C7", color: "#92400E" };
      case "new":
        return { ...baseStyle, backgroundColor: "#DBEAFE", color: "#1E40AF" };
      case "accepted":
        return { ...baseStyle, backgroundColor: "#D1FAE5", color: "#065F46" };
      case "declined":
        return { ...baseStyle, backgroundColor: "#FEE2E2", color: "#991B1B" };
      default:
        return baseStyle;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Your Response";
      case "new":
        return "New Request";
      case "accepted":
        return "Accepted";
      case "declined":
        return "Declined";
      default:
        return status;
    }
  };

  const getTimelineCircleStyle = (status: string) => {
    switch (status) {
      case "completed":
        return {
          ...styles.timelineCircle,
          backgroundColor: "#00BF63",
          borderColor: "#00BF63",
        };
      case "current":
        return {
          ...styles.timelineCircle,
          backgroundColor: "white",
          borderColor: "#00BF63",
        };
      default:
        return styles.timelineCircle;
    }
  };

  const getTimelineLabelStyle = (status: string) => {
    if (status === "completed" || status === "current") {
      return { ...styles.timelineLabel, color: "#00BF63" };
    }
    return styles.timelineLabel;
  };

  const handleAccept = () => {
    console.log("Accept request");
    navigate("/provider/requests");
  };

  const handleReject = () => {
    console.log("Reject request");
    navigate("/provider/requests");
  };

  const handleCounterOffer = () => {
    navigate(`/provider/counter-offer/${id}`);
  };

  const initials = request.customer.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div style={styles.container}>
      <div style={styles.maxWidthContainer}>
        <div style={styles.header}>
          <button
            style={styles.backButton}
            onClick={() => navigate("/provider/requests")}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00BF63")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            <ArrowLeft size={18} />
            Back to Requests
          </button>
          <div style={styles.headerRow}>
            <h1 style={styles.pageTitle}>{request.refNumber}</h1>
            <div style={getStatusBadgeStyle(request.status)}>
              {getStatusLabel(request.status)}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div style={styles.infoBox}>
          <AlertCircle size={18} style={{ marginTop: "2px", flexShrink: 0 }} />
          <div>
            <strong>Action Required:</strong> This customer is waiting for your response. 
            Please accept, reject, or send a counter offer within 24 hours.
          </div>
        </div>

        {/* Progress Timeline */}
        <div style={styles.card}>
          <div style={styles.timeline}>
            <div style={styles.timelineLine}>
              <div
                style={{ ...styles.timelineProgress, width: `${progressPercentage}%` }}
              />
            </div>
            {timelineSteps.map((step, index) => (
              <div key={index} style={styles.timelineStep}>
                <div style={getTimelineCircleStyle(step.status)}>
                  {step.status === "completed" && <CheckCircle size={20} color="white" />}
                </div>
                <div style={getTimelineLabelStyle(step.status)}>{step.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Left Column */}
          <div>
            {/* Customer Info */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Customer Information</h2>
              <div style={styles.customerSection}>
                <div style={styles.avatar}>{initials}</div>
                <div style={styles.customerInfo}>
                  <div style={styles.customerName}>{request.customer.name}</div>
                  <div style={styles.rating}>
                    <Star size={16} fill="#FCD34D" color="#FCD34D" />
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                      {request.customer.rating}
                    </span>
                    <span style={{ fontSize: "12px", color: "#9CA3AF" }}>
                      ({request.customer.totalReviews} reviews)
                    </span>
                  </div>
                  <div style={styles.phoneNumber}>
                    <Phone size={14} />
                    {request.customer.phone}
                    <span style={{ fontSize: "11px", color: "#9CA3AF", marginLeft: "4px" }}>
                      (visible after accepting)
                    </span>
                  </div>
                  <div style={styles.buttonGroup}>
                    <button
                      style={{ ...styles.button, ...styles.secondaryButton }}
                      disabled
                    >
                      <Phone size={16} />
                      Call
                    </button>
                    <button
                      style={{ ...styles.button, ...styles.secondaryButton }}
                      disabled
                    >
                      <MessageCircle size={16} />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Service Details</h2>

              <div style={styles.detailRow}>
                <div style={styles.detailIcon}>
                  <Calendar size={18} />
                </div>
                <div style={styles.detailContent}>
                  <div style={styles.detailLabel}>Service Type</div>
                  <div style={styles.detailValue}>{request.service.type}</div>
                </div>
              </div>

              <div style={styles.detailRow}>
                <div style={styles.detailIcon}>
                  <Calendar size={18} />
                </div>
                <div style={styles.detailContent}>
                  <div style={styles.detailLabel}>Proposed Date & Time</div>
                  <div style={styles.detailValue}>
                    {request.service.proposedDate} • {request.service.proposedTime}
                  </div>
                </div>
              </div>

              <div style={styles.detailRow}>
                <div style={styles.detailIcon}>
                  <MapPin size={18} />
                </div>
                <div style={styles.detailContent}>
                  <div style={styles.detailLabel}>Location</div>
                  <div style={styles.detailValue}>{request.service.location}</div>
                  <div style={styles.mapPlaceholder}>
                    <div style={{ textAlign: "center" }}>
                      <MapPin size={24} style={{ marginBottom: "8px" }} />
                      <div>Map Preview</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.detailRow}>
                <div style={styles.detailIcon}>
                  <AlertCircle size={18} />
                </div>
                <div style={styles.detailContent}>
                  <div style={styles.detailLabel}>Description</div>
                  <div style={styles.detailValue}>{request.service.description}</div>
                </div>
              </div>

              {request.photos.length > 0 && (
                <div style={{ marginTop: "16px" }}>
                  <div style={styles.detailLabel}>Photos</div>
                  <div style={styles.photoGrid}>
                    {request.photos.map((photo) => (
                      <div key={photo.id} style={styles.photoItem}>
                        <ImageIcon size={24} color="#9CA3AF" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={styles.detailRow}>
                <div style={styles.detailIcon}>
                  <AlertCircle size={18} />
                </div>
                <div style={styles.detailContent}>
                  <div style={styles.detailLabel}>Special Instructions</div>
                  <div style={styles.detailValue}>{request.service.instructions}</div>
                </div>
              </div>

              <div style={styles.detailRow}>
                <div style={styles.detailIcon}>
                  <Clock size={18} />
                </div>
                <div style={styles.detailContent}>
                  <div style={styles.detailLabel}>Estimated Duration</div>
                  <div style={styles.detailValue}>{request.service.estimatedDuration}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Pricing Breakdown */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Pricing Breakdown</h2>

              <div style={styles.pricingRow}>
                <div style={styles.pricingLabel}>Service Fee</div>
                <div style={styles.pricingValue}>
                  ₱{request.pricing.serviceFee.toLocaleString()}
                </div>
              </div>

              <div style={styles.pricingRow}>
                <div style={styles.pricingLabel}>Platform Fee (10%)</div>
                <div style={styles.pricingValue}>
                  -₱{request.pricing.platformFee.toLocaleString()}
                </div>
              </div>

              <div style={styles.totalRow}>
                <div style={styles.totalLabel}>Your Earnings</div>
                <div style={styles.totalValue}>
                  ₱{request.pricing.providerEarnings.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Actions</h2>

              <div style={styles.actionButtons}>
                <button
                  style={{
                    ...styles.button,
                    ...styles.primaryButton,
                    gridColumn: "1 / -1",
                  }}
                  onClick={handleAccept}
                >
                  <CheckCircle size={16} />
                  Accept Request
                </button>
                <button
                  style={{
                    ...styles.button,
                    ...styles.outlinedButton,
                    gridColumn: "1 / -1",
                    fontSize: "15px",
                  }}
                  onClick={handleCounterOffer}
                >
                  Counter Offer
                </button>
                <button
                  style={{
                    ...styles.button,
                    ...styles.dangerButton,
                    gridColumn: "1 / -1",
                  }}
                  onClick={handleReject}
                >
                  <X size={16} />
                  Reject Request
                </button>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  padding: "12px",
                  backgroundColor: "#FEF3C7",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#92400E",
                  textAlign: "center",
                }}
              >
                💡 Tip: Send a counter offer if you need to adjust the date, time, or price
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
