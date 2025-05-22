 // Check authentication and role
      const username = localStorage.getItem("username");
      const role = localStorage.getItem("role");
      const userId = localStorage.getItem("userId");

      // Redirect if not authenticated or wrong role
      if (
        !username ||
        !role ||
        !userId ||
        (role !== "member" && role !== "admin")
      ) {
        alert("Access denied. Please login as member or admin.");
        localStorage.clear();
        window.location.href = "login.html";
      }

      // Update UI based on role
      document.getElementById("usernameDisplay").textContent = username;
      document.getElementById("roleDisplay").textContent = role;

      if (role === "admin") {
        document.getElementById("adminLink").style.display = "inline";
      }

      // Logout functionality
      document.getElementById("logout").addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to logout?")) {
          localStorage.clear();
          window.location.href = "login.html";
        }
      });

      // In a real application, you would fetch member data from your backend
      // Here's a mock implementation:
      function loadMemberData() {
        // Mock data - replace with actual API calls
        setTimeout(() => {
          document.getElementById("membershipInfo").innerHTML = `
          <p><strong>Type:</strong> Premium Membership</p>
          <p><strong>Start Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Expiry Date:</strong> ${new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toLocaleDateString()}</p>
          <p><strong>Status:</strong> Active</p>
        `;

          document.getElementById("upcomingSessions").innerHTML = `
          <p><strong>Next Session:</strong> Tomorrow at 6:00 PM</p>
          <p><strong>Trainer:</strong> John Smith</p>
          <p><strong>Location:</strong> Main Gym Floor</p>
        `;

          document.getElementById("paymentHistory").innerHTML = `
          <p><strong>Last Payment:</strong> $99.00 on ${new Date().toLocaleDateString()}</p>
          <p><strong>Next Payment Due:</strong> ${new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toLocaleDateString()}</p>
          <p><strong>Payment Method:</strong> Credit Card ****4242</p>
        `;
        }, 1000);
      }

      // Load member data when page loads
      loadMemberData();

      // In a real implementation with Firebase:
  
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
    import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

   
      const firebaseConfig = {
        apiKey: "AIzaSyDfSfc_QEbZpGMWcC1DC7xwmS35IgydSHQ",
        authDomain: "gym-management-system-2b739.firebaseapp.com",
        projectId: "gym-management-system-2b739",
        storageBucket: "gym-management-system-2b739.firebasestorage.app",
        messagingSenderId: "910878552565",
        appId: "1:910878552565:web:e176dd1ac02dd01245f0bc",
       
      };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    async function loadMemberData() {
      try {
        const docRef = doc(db, "members", userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const memberData = docSnap.data();
          // Update the DOM with real data
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    }
    