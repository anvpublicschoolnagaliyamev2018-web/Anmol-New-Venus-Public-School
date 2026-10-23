
"use strict";

/*
  CASHFREE PAYMENT LINK
  अपना असली Cashfree Payment Link नीचे खाली quotes के बीच डालें।
  उदाहरण का URL न डालें; Cashfree Dashboard से मिला वास्तविक लिंक ही इस्तेमाल करें।
*/
const CASHFREE_PAYMENT_LINK = "https://payments.cashfree.com/forms?code=anv-registration";




/* ANVPS Original GIF Intro */
window.addEventListener("load", function () {
  const intro = document.getElementById("introScreen");

  if (intro) {
    window.setTimeout(function () {
      intro.classList.add("hide");
    }, 1200);
  }
});



// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label",
      isOpen ? "Close navigation" : "Open navigation");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });
}

// Fee structure
const classSelector = document.getElementById("classSelector");
const feeClassName = document.getElementById("feeClassName");
const monthlyFee = document.getElementById("monthlyFee");

const feeData = {
  nursery: { name: "Nursery", monthly: 400 },
  lkg: { name: "LKG", monthly: 400 },
  ukg: { name: "UKG", monthly: 400 },
  class1: { name: "Class 1", monthly: 450 },
  class2: { name: "Class 2", monthly: 450 },
  class3: { name: "Class 3", monthly: 500 },
  class4: { name: "Class 4", monthly: 500 },
  class5: { name: "Class 5", monthly: 500 }
};

function updateFeeDetails() {
  if (!classSelector || !feeClassName || !monthlyFee) return;

  const selected = feeData[classSelector.value] || feeData.nursery;
  feeClassName.textContent = selected.name + " Fee Details";
  monthlyFee.textContent = "₹" + selected.monthly;
}

if (classSelector) {
  classSelector.addEventListener("change", updateFeeDetails);
  updateFeeDetails();
}

// Cashfree payment button
const cashfreePayButton = document.getElementById("cashfreePayButton");
const paymentStatus = document.getElementById("paymentStatus");

if (cashfreePayButton) {
  cashfreePayButton.addEventListener("click", function (event) {
    event.preventDefault();

    const paymentLink = CASHFREE_PAYMENT_LINK.trim();

    if (!paymentLink) {
      if (paymentStatus) {
        paymentStatus.textContent =
          "Cashfree payment link abhi add nahi hua hai. Link add hone ke baad payment shuru ho sakega.";
      }
      return;
    }

    // Only allow HTTPS payment URLs.
    let parsedUrl;

    try {
      parsedUrl = new URL(paymentLink);
    } catch (error) {
      if (paymentStatus) {
        paymentStatus.textContent =
          "Payment link sahi format mein nahi hai. Cashfree Dashboard ka link check karein.";
      }
      return;
    }

    if (parsedUrl.protocol !== "https:") {
      if (paymentStatus) {
        paymentStatus.textContent =
          "Security ke liye HTTPS payment link zaroori hai.";
      }
      return;
    }

    window.location.href = parsedUrl.href;
  });
}

// Admission enquiry to WhatsApp
const admissionForm = document.getElementById("admissionForm");

if (admissionForm) {
  admissionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const student = document.getElementById("studentName").value.trim();
    const guardian = document.getElementById("guardianName").value.trim();
    const mobile = document.getElementById("mobileNumber").value.trim();
    const selectedClass = document.getElementById("admissionClass").value;
    const message = document.getElementById("parentMessage").value.trim();

    if (!student || !guardian || !mobile || !selectedClass) {
      alert("Please fill all required fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const whatsappMessage = [
      "ANV PUBLIC SCHOOL - Admission Enquiry",
      "",
      "Session: 2026-27",
      "Student Name: " + student,
      "Parent/Guardian Name: " + guardian,
      "Mobile Number: " + mobile,
      "Admission Class: " + selectedClass,
      "Message: " + (message || "Not provided")
    ].join("\n");

    const whatsappUrl =
      "https://wa.me/919756201099?text=" +
      encodeURIComponent(whatsappMessage);

    window.open(whatsappUrl, "_blank", "noopener");
  });
}

// Footer year
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

// Scroll reveal animations
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(function (element) {
    element.classList.add("visible");
  });
}
