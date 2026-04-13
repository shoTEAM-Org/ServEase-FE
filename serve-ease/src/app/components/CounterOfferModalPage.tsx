import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  User,
  Briefcase,
  X,
} from "lucide-react";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F9FAFB",
    padding: "32px",
  },
  maxWidthContainer: {
    maxWidth: "1100px",
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
  pageSubtitle: {
    fontSize: "14px",
    color: "#6B7280",
  },
  gridTwoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #F3F4F6",
    padding: "32px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  accentBar: {
    height: "4px",
    width: "32px",
    backgroundColor: "#00BF63",
    borderRadius: "2px",
  },
  customerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "20px",
    backgroundColor: "#F9FAFB",
    borderRadius: "12px",
    marginBottom: "24px",
    border: "1px solid #F3F4F6",
  },
  avatar: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #10B981",
  },
  customerName: {
    fontSize: "11px",
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: "4px",
  },
  customerNameValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
  },
  detailItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "20px",
  },
  detailIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #BBF7D0",
    flexShrink: 0,
  },
  detailLabel: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    marginBottom: "6px",
  },
  detailValue: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827",
  },
  detailSubValue: {
    fontSize: "14px",
    color: "#6B7280",
    marginTop: "2px",
  },
  formGroup: {
    marginBottom: "24px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
    display: "block",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "2px solid #E5E7EB",
    fontSize: "14px",
    color: "#374151",
    outline: "none",
    width: "100%",
    transition: "border-color 0.3s ease",
  },
  textarea: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "2px solid #E5E7EB",
    fontSize: "14px",
    color: "#374151",
    outline: "none",
    width: "100%",
    minHeight: "100px",
    resize: "vertical" as const,
    fontFamily: "inherit",
    transition: "border-color 0.3s ease",
  },
  pill: {
    padding: "10px 20px",
    borderRadius: "20px",
    border: "2px solid #E5E7EB",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "white",
    color: "#6B7280",
    display: "inline-block",
  },
  pillActive: {
    backgroundColor: "#00BF63",
    borderColor: "#00BF63",
    color: "white",
  },
  pillGroup: {
    display: "flex",
    gap: "12px",
  },
  button: {
    padding: "12px 24px",
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
    flex: 1,
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
  buttonRow: {
    display: "flex",
    gap: "12px",
    marginTop: "32px",
  },
  highlightBox: {
    backgroundColor: "#DBEAFE",
    border: "1px solid #93C5FD",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "24px",
  },
  highlightTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: "8px",
  },
  highlightText: {
    fontSize: "13px",
    color: "#1E3A8A",
    lineHeight: "1.5",
  },
};

export function CounterOfferModalPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Original booking data
  const originalBooking = {
    customer: "Maria Santos",
    service: "Plumbing Repair",
    date: "March 25, 2024",
    time: "2:00 PM",
    price: 1500,
    duration: "2 hours",
  };

  // Counter offer form state
  const [proposedDate, setProposedDate] = useState("");
  const [proposedTime, setProposedTime] = useState("");
  const [proposedPrice, setProposedPrice] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [reason, setReason] = useState("");
  const [validityPeriod, setValidityPeriod] = useState("24");

  const handleSubmit = () => {
    console.log("Counter offer submitted:", {
      proposedDate,
      proposedTime,
      proposedPrice,
      estimatedDuration,
      reason,
      validityPeriod,
    });
    // Navigate back to requests or show success message
    navigate("/provider/requests");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidthContainer}>
        <div style={styles.header}>
          <button
            style={styles.backButton}
            onClick={handleCancel}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00BF63")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <h1 style={styles.pageTitle}>Send Counter Offer</h1>
          <p style={styles.pageSubtitle}>
            Propose changes to the booking request if needed
          </p>
        </div>

        <div style={styles.gridTwoCol}>
          {/* Left Column - Original Booking Details */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <div style={styles.accentBar} />
              Original Booking Request
            </h2>

            {/* Customer Info */}
            <div style={styles.customerInfo}>
              <div style={styles.avatar}>
                <User size={28} color="#10B981" />
              </div>
              <div>
                <div style={styles.customerName}>Customer</div>
                <div style={styles.customerNameValue}>{originalBooking.customer}</div>
              </div>
            </div>

            {/* Service Details */}
            <div style={styles.detailItem}>
              <div style={styles.detailIcon}>
                <Briefcase size={20} color="#10B981" />
              </div>
              <div>
                <div style={styles.detailLabel}>Service Type</div>
                <div style={styles.detailValue}>{originalBooking.service}</div>
              </div>
            </div>

            <div style={styles.detailItem}>
              <div style={styles.detailIcon}>
                <Calendar size={20} color="#10B981" />
              </div>
              <div>
                <div style={styles.detailLabel}>Requested Date & Time</div>
                <div style={styles.detailValue}>{originalBooking.date}</div>
                <div style={styles.detailSubValue}>{originalBooking.time}</div>
              </div>
            </div>

            <div style={styles.detailItem}>
              <div style={styles.detailIcon}>
                <Clock size={20} color="#10B981" />
              </div>
              <div>
                <div style={styles.detailLabel}>Duration</div>
                <div style={styles.detailValue}>{originalBooking.duration}</div>
              </div>
            </div>

            <div style={styles.detailItem}>
              <div style={styles.detailIcon}>
                <DollarSign size={20} color="#10B981" />
              </div>
              <div>
                <div style={styles.detailLabel}>Original Price</div>
                <div style={styles.detailValue}>
                  ₱{originalBooking.price.toLocaleString()}
                </div>
              </div>
            </div>

            <div style={styles.highlightBox}>
              <div style={styles.highlightTitle}>💡 Counter Offer Tips</div>
              <div style={styles.highlightText}>
                • Be clear about why you need to make changes
                <br />
                • Keep your pricing competitive and fair
                <br />
                • Respond quickly to increase acceptance rate
              </div>
            </div>
          </div>

          {/* Right Column - Counter Offer Form */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <div style={styles.accentBar} />
              Your Counter Offer
            </h2>

            <div style={styles.formGroup}>
              <label style={styles.label}>Proposed Date</label>
              <input
                type="date"
                style={styles.input}
                value={proposedDate}
                onChange={(e) => setProposedDate(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#00BF63")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Proposed Time</label>
              <input
                type="time"
                style={styles.input}
                value={proposedTime}
                onChange={(e) => setProposedTime(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#00BF63")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Proposed Price (₱)</label>
              <input
                type="number"
                style={styles.input}
                value={proposedPrice}
                onChange={(e) => setProposedPrice(e.target.value)}
                placeholder="Enter your proposed price"
                onFocus={(e) => (e.target.style.borderColor = "#00BF63")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Estimated Duration</label>
              <input
                type="text"
                style={styles.input}
                value={estimatedDuration}
                onChange={(e) => setEstimatedDuration(e.target.value)}
                placeholder="e.g., 3 hours"
                onFocus={(e) => (e.target.style.borderColor = "#00BF63")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Reason for Counter Offer</label>
              <textarea
                style={styles.textarea}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain why you're proposing these changes..."
                onFocus={(e) => (e.target.style.borderColor = "#00BF63")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Validity Period</label>
              <div style={styles.pillGroup}>
                <button
                  style={{
                    ...styles.pill,
                    ...(validityPeriod === "24" ? styles.pillActive : {}),
                  }}
                  onClick={() => setValidityPeriod("24")}
                >
                  24 hours
                </button>
                <button
                  style={{
                    ...styles.pill,
                    ...(validityPeriod === "48" ? styles.pillActive : {}),
                  }}
                  onClick={() => setValidityPeriod("48")}
                >
                  48 hours
                </button>
                <button
                  style={{
                    ...styles.pill,
                    ...(validityPeriod === "72" ? styles.pillActive : {}),
                  }}
                  onClick={() => setValidityPeriod("72")}
                >
                  72 hours
                </button>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                  marginTop: "8px",
                }}
              >
                The customer will have {validityPeriod} hours to accept your counter offer
              </div>
            </div>

            <div style={styles.buttonRow}>
              <button
                style={{ ...styles.button, ...styles.secondaryButton }}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                style={{ ...styles.button, ...styles.primaryButton }}
                onClick={handleSubmit}
              >
                Send Counter Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
