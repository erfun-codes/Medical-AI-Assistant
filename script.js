
// /**
//  * CureLink Premium - Core Engine & Interactive UI Scripts
//  * (Merged & Cleaned Version — combines user's original logic + AI enhancements,
//  *  with duplicate declarations removed and accessibility features restored.)
//  */

// document.addEventListener('DOMContentLoaded', () => {

//     /* ==========================================
//        1. Dark / Light Mode Theme Engine (With LocalStorage)
//        ========================================== */
//     const themeToggleBtn = document.getElementById('theme-toggle');
//     const rootElement = document.documentElement;

//     if (themeToggleBtn) {
//         const themeIcon = themeToggleBtn.querySelector('i');

//         // Load saved theme on page load
//         const savedTheme = localStorage.getItem('theme');
//         if (savedTheme === 'dark') {
//             rootElement.setAttribute('data-theme', 'dark');
//             if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
//         }

//         themeToggleBtn.addEventListener('click', () => {
//             const isDark = rootElement.getAttribute('data-theme') === 'dark';

//             if (isDark) {
//                 rootElement.removeAttribute('data-theme');
//                 localStorage.setItem('theme', 'light');
//                 if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
//             } else {
//                 rootElement.setAttribute('data-theme', 'dark');
//                 localStorage.setItem('theme', 'dark');
//                 if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
//             }

//             themeToggleBtn.classList.add('spin');
//             setTimeout(() => themeToggleBtn.classList.remove('spin'), 400);
//         });
//     }

//     /* ==========================================
//        2. Ambient Floating Icons System
//        ========================================== */
//     const floatWrap = document.getElementById('floating-icons');
//     if (floatWrap) {
//         const iconPool = ['fa-heart-pulse', 'fa-stethoscope', 'fa-capsules', 'fa-user-doctor', 'fa-syringe', 'fa-tooth', 'fa-brain'];

//         function spawnFloatingIcon() {
//             const el = document.createElement('i');
//             const cls = iconPool[Math.floor(Math.random() * iconPool.length)];
//             el.className = `fa-solid ${cls}`;
//             el.style.left = `${Math.random() * 96}%`;
//             el.style.bottom = `-40px`;
//             el.style.fontSize = `${14 + Math.random() * 16}px`;
//             el.style.animationDuration = `${10 + Math.random() * 8}s`;
//             floatWrap.appendChild(el);
//             setTimeout(() => el.remove(), 19000);
//         }

//         for (let i = 0; i < 6; i++) {
//             setTimeout(() => spawnFloatingIcon(), i * 1400);
//         }
//         setInterval(spawnFloatingIcon, 2200);
//     }

//     /* ==========================================
//        3. Typewriter Placeholder Effect
//        ========================================== */
//     const searchInput = document.getElementById('dynamic-search');
//     if (searchInput) {
//         const searchPhrases = [
//             "Search doctors, clinics, specialties...",
//             "Search for 'Cardiologist'...",
//             "Search for 'Fever, Cold and Cough'...",
//             "Try 'Jangipur Care Clinic'...",
//             "Search for 'Full Body Health Checkup'...",
//             "Search for 'Top Dentist near me'...",
//             "Try 'Dr. Ayesha Rahman'..."
//         ];

//         let phraseIndex = 0;
//         let characterIndex = 0;
//         let deletingMode = false;
//         let effectDelay = 100;

//         function handleTypingPlaceholder() {
//             // Pause the effect while user is focused on / typing in the field
//             if (document.activeElement === searchInput || searchInput.value) {
//                 setTimeout(handleTypingPlaceholder, 500);
//                 return;
//             }

//             const activePhrase = searchPhrases[phraseIndex];

//             if (deletingMode) {
//                 searchInput.setAttribute('placeholder', activePhrase.substring(0, characterIndex - 1));
//                 characterIndex--;
//                 effectDelay = 35;
//             } else {
//                 searchInput.setAttribute('placeholder', activePhrase.substring(0, characterIndex + 1));
//                 characterIndex++;
//                 effectDelay = 85;
//             }

//             if (!deletingMode && characterIndex === activePhrase.length) {
//                 deletingMode = true;
//                 effectDelay = 2000;
//             } else if (deletingMode && characterIndex === 0) {
//                 deletingMode = false;
//                 phraseIndex = (phraseIndex + 1) % searchPhrases.length;
//                 effectDelay = 300;
//             }

//             setTimeout(handleTypingPlaceholder, effectDelay);
//         }

//         setTimeout(handleTypingPlaceholder, 600);
//     }

//     /* ==========================================
//        4. Live Search Suggestions Engine
//        ========================================== */
//     const suggestBox = document.getElementById('search-suggestions');
//     if (searchInput && suggestBox) {
//         // Combined list from both versions (nothing dropped)
//         const suggestData = [
//             { name: 'Dr. Rahul Sharma', tag: 'Cardiologist', icon: 'fa-heart-pulse' },
//             { name: 'Dr. Ayesha Rahman', tag: 'Cardiologist', icon: 'fa-heart-pulse' },
//             { name: 'Dr. Karim Uddin', tag: 'Dermatologist', icon: 'fa-hand-dots' },
//             { name: 'Dr. Nusrat Jahan', tag: 'Pediatrician', icon: 'fa-child' },
//             { name: 'Dr. Farhan Islam', tag: 'Orthopedic', icon: 'fa-bone' },
//             { name: 'Dr. Priya Sharma', tag: 'Dentist', icon: 'fa-tooth' },
//             { name: 'Dr. Sourav Ghosh', tag: 'Neurologist', icon: 'fa-brain' },
//             { name: 'CureLink Diagnostics', tag: 'Lab Test', icon: 'fa-vial' },
//             { name: 'Skin & Hair Clinic', tag: 'Dermatology', icon: 'fa-spa' },
//             { name: 'General Physician', tag: 'Specialty', icon: 'fa-user-doctor' }
//         ];

//         function renderSuggestions(query) {
//             if (!query) {
//                 suggestBox.classList.remove('open');
//                 suggestBox.innerHTML = '';
//                 return;
//             }
//             const matches = suggestData.filter(item =>
//                 item.name.toLowerCase().includes(query.toLowerCase()) ||
//                 item.tag.toLowerCase().includes(query.toLowerCase())
//             );

//             if (matches.length === 0) {
//                 suggestBox.innerHTML = `<div class="suggest-empty">No matches found for "${query}". Try a different name or specialty.</div>`;
//             } else {
//                 suggestBox.innerHTML = matches.slice(0, 6).map(item => `
//                     <div class="suggest-item" data-name="${item.name}">
//                         <i class="fa-solid ${item.icon}"></i>
//                         <span>${item.name}</span>
//                         <span class="suggest-tag">${item.tag}</span>
//                     </div>
//                 `).join('');
//             }
//             suggestBox.classList.add('open');
//         }

//         searchInput.addEventListener('input', (e) => renderSuggestions(e.target.value.trim()));
//         searchInput.addEventListener('focus', (e) => { if (e.target.value.trim()) renderSuggestions(e.target.value.trim()); });

//         suggestBox.addEventListener('click', (e) => {
//             const item = e.target.closest('.suggest-item');
//             if (!item) return;
//             searchInput.value = item.getAttribute('data-name');
//             suggestBox.classList.remove('open');
//             executeSearchRedirect();
//         });

//         document.addEventListener('click', (e) => {
//             if (!e.target.closest('#search-section') && !e.target.closest('#search-suggestions')) {
//                 suggestBox.classList.remove('open');
//             }
//         });
//     }

//     /* ==========================================
//        5. Search Enter Key Listener
//        ========================================== */
//     if (searchInput) {
//         searchInput.addEventListener('keypress', function (e) {
//             if (e.key === 'Enter') {
//                 executeSearchRedirect();
//             }
//         });
//     }

//     /* ==========================================
//        6. Scroll Reveal Observer
//        ========================================== */
//     const revealSections = document.querySelectorAll('.service-card, .doctor-card, .stat-card, .testimonial-card, .section-title');
//     if (revealSections.length > 0) {
//         const revealObserver = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (!entry.isIntersecting) return;
//                 entry.target.classList.add('reveal-active');
//                 revealObserver.unobserve(entry.target);
//             });
//         }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

//         revealSections.forEach(section => {
//             section.classList.add('reveal-hidden');
//             revealObserver.observe(section);
//         });
//     }

//     /* ==========================================
//        7. Book Appointment Buttons
//        ========================================== */
//     const bookButtons = document.querySelectorAll('.book-btn, .cta-btn');
//     bookButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             showToast("🎉 Appointment Token Generated! Redirecting safely...", "success");
//         });
//     });
// });

// /* ==========================================
//    8. Service Click Master Handler & Modals Logic
//    ========================================== */
// function handleServiceClick(serviceType) {
//     switch (serviceType) {
//         case 'video':
//             openModal('Instant Video Consultation', `
//                 <p style="margin-bottom:15px; color:#64748b;">Connect with an online top doctor in less than 2 minutes.</p>
//                 <div style="background:rgba(16,185,129,0.1); padding:12px; border-radius:8px; border-left:4px solid #10b981; margin-bottom:15px;">
//                     <i class="fa-solid fa-circle-check" style="color:#10b981;"></i> <strong>12+ Doctors</strong> are currently live online.
//                 </div>
//                 <button onclick="showToast('Connecting with General Physician...', 'success'); closeModal();" style="width:100%; padding:12px; background:#0284c7; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Start Instant Call Now</button>
//             `);
//             break;

//         case 'find-doctors':
//             scrollToSearch();
//             break;

//         case 'lab-tests':
//             openModal('Book Diagnostic Lab Test', `
//                 <p style="margin-bottom:15px; color:#64748b;">Select packages for safe home sample collection:</p>
//                 <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:15px;">
//                     <label style="padding:10px; border:1px solid #cbd5e1; border-radius:8px; cursor:pointer; display:flex; justify-content:space-between;">
//                         <span><input type="radio" name="lab-pkg" checked> Full Body Checkup</span>
//                         <strong style="color:#0284c7;">৳1,499</strong>
//                     </label>
//                     <label style="padding:10px; border:1px solid #cbd5e1; border-radius:8px; cursor:pointer; display:flex; justify-content:space-between;">
//                         <span><input type="radio" name="lab-pkg"> Diabetes Profile</span>
//                         <strong style="color:#0284c7;">৳699</strong>
//                     </label>
//                 </div>
//                 <button onclick="showToast('Sample Collection Scheduled!', 'success'); closeModal();" style="width:100%; padding:12px; background:#0284c7; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Confirm Booking</button>
//             `);
//             break;

//         case 'hospitals':
//             openModal('Partner Hospitals Nearby', `
//                 <p style="margin-bottom:15px; color:#64748b;">Top trusted hospitals in your location:</p>
//                 <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:10px; margin-bottom:15px;">
//                     <li style="padding:10px; background:rgba(2,132,199,0.05); border-radius:8px; display:flex; justify-content:space-between;">
//                         <span>🏥 Square Hospital</span> <span style="font-size:0.85rem; color:#10b981;">ICU Bed Available</span>
//                     </li>
//                     <li style="padding:10px; background:rgba(2,132,199,0.05); border-radius:8px; display:flex; justify-content:space-between;">
//                         <span>🏥 Labaid Specialized</span> <span style="font-size:0.85rem; color:#10b981;">Emergency Open</span>
//                     </li>
//                 </ul>
//                 <button onclick="closeModal();" style="width:100%; padding:10px; background:#64748b; color:#fff; border:none; border-radius:8px; cursor:pointer;">Close</button>
//             `);
//             break;

//         case 'medicine':
//             openModal('Order Genuine Medicines', `
//                 <p style="margin-bottom:15px; color:#64748b;">Upload your prescription picture to get delivery within 2 hours:</p>
//                 <div style="border:2px dashed #0284c7; padding:20px; text-align:center; border-radius:10px; margin-bottom:15px; background:rgba(2,132,199,0.02); cursor:pointer;">
//                     <i class="fa-solid fa-cloud-arrow-up" style="font-size:2rem; color:#0284c7; margin-bottom:8px;"></i>
//                     <p style="margin:0; font-size:0.9rem; font-weight:600;">Drag & Drop or Click to Upload Prescription</p>
//                 </div>
//                 <button onclick="showToast('Prescription Uploaded! Reviewing by Pharmacist.', 'success'); closeModal();" style="width:100%; padding:12px; background:#0284c7; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Order Now</button>
//             `);
//             break;

//         case 'ai-checker':
//             openModal('🤖 AI Symptom Checker', `
//                 <p style="margin-bottom:10px; color:#64748b;">Describe what you are feeling (e.g., severe headache, chest pain, fever):</p>
//                 <textarea id="ai-symptom-input" rows="3" placeholder="Enter symptoms here..." style="width:100%; padding:10px; border-radius:8px; border:1px solid #cbd5e1; margin-bottom:12px; font-family:inherit;"></textarea>
//                 <button onclick="analyzeSymptomsWithAI()" style="width:100%; padding:12px; background:#8b5cf6; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Analyze with AI</button>
//                 <div id="ai-result" style="margin-top:12px; font-size:0.9rem;"></div>
//             `);
//             break;

//         case 'blood-donor':
//             openModal('🩸 Emergency Blood Donor Network', `
//                 <p style="margin-bottom:12px; color:#64748b;">Select required blood group for instant donor search:</p>
//                 <select id="blood-group-select" style="width:100%; padding:10px; border-radius:8px; border:1px solid #cbd5e1; margin-bottom:15px; font-weight:600;">
//                     <option value="A+">A Positive (A+)</option>
//                     <option value="B+">B Positive (B+)</option>
//                     <option value="O+">O Positive (O+)</option>
//                     <option value="AB+">AB Positive (AB+)</option>
//                     <option value="O-">O Negative (O-)</option>
//                 </select>
//                 <button onclick="searchBloodDonorsLogic()" style="width:100%; padding:12px; background:#ef4444; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Search Emergency Donors</button>
//                 <div id="donor-results" style="margin-top:12px;"></div>
//             `);
//             break;

//         case 'family':
//             openModal('👨‍👩‍👧 Family Health Dashboard', `
//                 <p style="margin-bottom:12px; color:#64748b;">Select family profile to view medical records:</p>
//                 <div style="display:flex; gap:10px; margin-bottom:15px;">
//                     <button style="flex:1; padding:10px; border:1px solid #0284c7; background:rgba(2,132,199,0.1); color:#0284c7; border-radius:8px; font-weight:600;">Self</button>
//                     <button style="flex:1; padding:10px; border:1px solid #cbd5e1; background:transparent; border-radius:8px;">Father</button>
//                     <button style="flex:1; padding:10px; border:1px solid #cbd5e1; background:transparent; border-radius:8px;">Mother</button>
//                 </div>
//                 <p style="font-size:0.85rem; color:#10b981;">✓ 4 Prescriptions & 2 Lab Reports synced.</p>
//             `);
//             break;

//         case 'insurance':
//             openModal('📋 Insurance Claim Helper', `
//                 <p style="margin-bottom:12px; color:#64748b;">Submit quick details for hassle-free claim approval:</p>
//                 <input type="text" placeholder="Insurance Policy Number" style="width:100%; padding:10px; border-radius:8px; border:1px solid #cbd5e1; margin-bottom:10px;">
//                 <input type="text" placeholder="Hospital / Diagnostic Center Name" style="width:100%; padding:10px; border-radius:8px; border:1px solid #cbd5e1; margin-bottom:15px;">
//                 <button onclick="showToast('Claim Submitted Successfully!', 'success'); closeModal();" style="width:100%; padding:12px; background:#10b981; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Submit Claim</button>
//             `);
//             break;

//         default:
//             showToast("Redirecting to service details...", "info");
//     }
// }

// /* ==========================================
//    9. AI Symptom & Blood Donor Logic Helper
//    ========================================== */
// function analyzeSymptomsWithAI() {
//     const inputEl = document.getElementById('ai-symptom-input');
//     const resBox = document.getElementById('ai-result');
//     if (!inputEl || !resBox) return;

//     const text = inputEl.value.trim();
//     if (!text) {
//         resBox.innerHTML = `<span style="color:#ef4444;">Please describe your symptoms first!</span>`;
//         return;
//     }
//     resBox.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="color:#8b5cf6;"></i> AI is analyzing symptoms...`;

//     setTimeout(() => {
//         resBox.innerHTML = `
//             <div style="background:rgba(139,92,246,0.1); padding:10px; border-radius:8px; border-left:4px solid #8b5cf6;">
//                 <strong>Recommended Specialist:</strong> General Physician / Cardiologist.<br>
//                 <small style="color:#64748b;">Suggested Action: Book an in-clinic consultation soon.</small>
//             </div>
//         `;
//     }, 1200);
// }

// function searchBloodDonorsLogic() {
//     const selectEl = document.getElementById('blood-group-select');
//     const res = document.getElementById('donor-results');
//     if (!selectEl || !res) return;

//     const bg = selectEl.value;
//     res.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="color:#ef4444;"></i> Searching donors for ${bg}...`;

//     setTimeout(() => {
//         res.innerHTML = `
//             <div style="background:rgba(239,68,68,0.08); padding:10px; border-radius:8px; font-size:0.85rem; color:#ef4444;">
//                 ❤️ <strong>3 Donors Found</strong> near your area for blood group ${bg}.
//             </div>
//         `;
//     }, 1000);
// }

// /* ==========================================
//    10. Custom Reusable Modal Engine
//    ========================================== */
// function openModal(title, htmlContent) {
//     closeModal(); // Close any existing modal first
//     const modalWrap = document.createElement('div');
//     modalWrap.id = 'curelink-custom-modal';
//     modalWrap.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; backdrop-filter:blur(4px); z-index:10000; display:flex; align-items:center; justify-content:center; padding:15px; background:rgba(0,0,0,0.5);';

//     modalWrap.innerHTML = `
//         <div style="background:#fff; color:#0f172a; width:100%; max-width:440px; border-radius:16px; padding:20px; box-shadow:0 20px 40px rgba(0,0,0,0.2); position:relative; animation:modalPop 0.3s ease;">
//             <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
//                 <h3 style="margin:0; font-size:1.15rem; font-weight:700;">${title}</h3>
//                 <i class="fa-solid fa-xmark" onclick="closeModal()" style="cursor:pointer; font-size:1.2rem; color:#64748b;"></i>
//             </div>
//             <div>${htmlContent}</div>
//         </div>
//     `;

//     document.body.appendChild(modalWrap);
// }

// function closeModal() {
//     const el = document.getElementById('curelink-custom-modal');
//     if (el) el.remove();
// }

// /* ==========================================
//    11. Global Router: Search Redirect
//    (single, clean version — loading state + safe redirect combined)
//    ========================================== */
// function executeSearchRedirect() {
//     const locationEl = document.getElementById('search-location');
//     const searchInputEl = document.getElementById('dynamic-search');
//     const btn = document.getElementById('search-btn');

//     const locationVal = locationEl ? locationEl.value : '';
//     const queryVal = searchInputEl ? searchInputEl.value.trim() : '';

//     if (btn) {
//         if (btn.classList.contains('loading')) return;
//         btn.classList.add('loading');
//     }

//     setTimeout(() => {
//         if (btn) btn.classList.remove('loading');
//         window.location.href = `search.html?query=${encodeURIComponent(queryVal)}&location=${encodeURIComponent(locationVal)}`;
//     }, 600);
// }

// /* ==========================================
//    12. Smooth Navigation & Focus Utility
//    (restored accessibility: prefers-reduced-motion + scrollend precision,
//     with graceful fallback for older browsers)
//    ========================================== */
// function scrollToSearch() {
//     const searchSection = document.getElementById('search-section');

//     if (!searchSection) {
//         console.error("CureLink Layout Error: Target element '#search-section' was not found.");
//         return;
//     }

//     const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

//     searchSection.scrollIntoView({
//         behavior: hasReducedMotion ? 'auto' : 'smooth',
//         block: 'center'
//     });

//     const searchInput = document.getElementById('dynamic-search');
//     if (searchInput) {
//         if ('onscrollend' in window) {
//             window.addEventListener('scrollend', function onScrollEndHandler() {
//                 triggerFocusAndGlow(searchInput);
//                 window.removeEventListener('scrollend', onScrollEndHandler); // avoid memory leak
//             }, { once: true });
//         } else {
//             // Fallback for browsers without 'scrollend' support
//             setTimeout(() => triggerFocusAndGlow(searchInput), 600);
//         }
//     }
// }

// function triggerFocusAndGlow(inputElement) {
//     inputElement.focus({ preventScroll: true }); // avoid re-triggering a scroll jump
//     inputElement.classList.add('search-glow-active');
//     setTimeout(() => {
//         inputElement.classList.remove('search-glow-active');
//     }, 1000);
// }

// /* ==========================================
//    13. Toast Notification Engine
//    (restored: CSS-class based, so your .toast-card / .visible styles in CSS work again)
//    ========================================== */
// function showToast(message, type = 'success') {
//     let container = document.getElementById('toast-container');
//     if (!container) {
//         container = document.createElement('div');
//         container.id = 'toast-container';
//         document.body.appendChild(container);
//     }

//     const toast = document.createElement('div');
//     toast.className = `toast-card ${type}`;

//     const icon = type === 'success' ? 'fa-circle-check' : (type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info');

//     toast.innerHTML = `
//         <i class="fa-solid ${icon}"></i>
//         <div class="toast-content">${message}</div>
//     `;

//     container.appendChild(toast);

//     setTimeout(() => toast.classList.add('visible'), 50);

//     setTimeout(() => {
//         toast.classList.remove('visible');
//         setTimeout(() => toast.remove(), 400);
//     }, 4000);
// }
/**
 * CureLink Premium - Core Engine & Interactive UI Scripts
 * (Merged & Cleaned Version — combines user's original logic + AI enhancements,
 *  with duplicate declarations removed and accessibility features restored.)
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Dark / Light Mode Theme Engine (With LocalStorage)
       ========================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;

    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');

        // Load saved theme on page load
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            rootElement.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
        }

        themeToggleBtn.addEventListener('click', () => {
            const isDark = rootElement.getAttribute('data-theme') === 'dark';

            if (isDark) {
                rootElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
            } else {
                rootElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
            }

            themeToggleBtn.classList.add('spin');
            setTimeout(() => themeToggleBtn.classList.remove('spin'), 400);
        });
    }

    /* ==========================================
       2. Ambient Floating Icons System
       ========================================== */
    const floatWrap = document.getElementById('floating-icons');
    if (floatWrap) {
        const iconPool = ['fa-heart-pulse', 'fa-stethoscope', 'fa-capsules', 'fa-user-doctor', 'fa-syringe', 'fa-tooth', 'fa-brain'];

        function spawnFloatingIcon() {
            const el = document.createElement('i');
            const cls = iconPool[Math.floor(Math.random() * iconPool.length)];
            el.className = `fa-solid ${cls}`;
            el.style.left = `${Math.random() * 96}%`;
            el.style.bottom = `-40px`;
            el.style.fontSize = `${14 + Math.random() * 16}px`;
            el.style.animationDuration = `${10 + Math.random() * 8}s`;
            floatWrap.appendChild(el);
            setTimeout(() => el.remove(), 19000);
        }

        for (let i = 0; i < 6; i++) {
            setTimeout(() => spawnFloatingIcon(), i * 1400);
        }
        setInterval(spawnFloatingIcon, 2200);
    }

    /* ==========================================
       3. Typewriter Placeholder Effect
       ========================================== */
    const searchInput = document.getElementById('dynamic-search');
    if (searchInput) {
        const searchPhrases = [
            "Search doctors, clinics, specialties...",
            "Search for 'Cardiologist'...",
            "Search for 'Fever, Cold and Cough'...",
            "Try 'Jangipur Care Clinic'...",
            "Search for 'Full Body Health Checkup'...",
            "Search for 'Top Dentist near me'...",
            "Try 'Dr. Ayesha Rahman'..."
        ];

        let phraseIndex = 0;
        let characterIndex = 0;
        let deletingMode = false;
        let effectDelay = 100;

        function handleTypingPlaceholder() {
            // Pause the effect while user is focused on / typing in the field
            if (document.activeElement === searchInput || searchInput.value) {
                setTimeout(handleTypingPlaceholder, 500);
                return;
            }

            const activePhrase = searchPhrases[phraseIndex];

            if (deletingMode) {
                searchInput.setAttribute('placeholder', activePhrase.substring(0, characterIndex - 1));
                characterIndex--;
                effectDelay = 35;
            } else {
                searchInput.setAttribute('placeholder', activePhrase.substring(0, characterIndex + 1));
                characterIndex++;
                effectDelay = 85;
            }

            if (!deletingMode && characterIndex === activePhrase.length) {
                deletingMode = true;
                effectDelay = 2000;
            } else if (deletingMode && characterIndex === 0) {
                deletingMode = false;
                phraseIndex = (phraseIndex + 1) % searchPhrases.length;
                effectDelay = 300;
            }

            setTimeout(handleTypingPlaceholder, effectDelay);
        }

        setTimeout(handleTypingPlaceholder, 600);
    }

    /* ==========================================
       4. Live Search Suggestions Engine
       ========================================== */
    const suggestBox = document.getElementById('search-suggestions');
    if (searchInput && suggestBox) {
        // Combined list from both versions (nothing dropped)
        const suggestData = [
            { name: 'Dr. Rahul Sharma', tag: 'Cardiologist', icon: 'fa-heart-pulse' },
            { name: 'Dr. Ayesha Rahman', tag: 'Cardiologist', icon: 'fa-heart-pulse' },
            { name: 'Dr. Karim Uddin', tag: 'Dermatologist', icon: 'fa-hand-dots' },
            { name: 'Dr. Nusrat Jahan', tag: 'Pediatrician', icon: 'fa-child' },
            { name: 'Dr. Farhan Islam', tag: 'Orthopedic', icon: 'fa-bone' },
            { name: 'Dr. Priya Sharma', tag: 'Dentist', icon: 'fa-tooth' },
            { name: 'Dr. Sourav Ghosh', tag: 'Neurologist', icon: 'fa-brain' },
            { name: 'CureLink Diagnostics', tag: 'Lab Test', icon: 'fa-vial' },
            { name: 'Skin & Hair Clinic', tag: 'Dermatology', icon: 'fa-spa' },
            { name: 'General Physician', tag: 'Specialty', icon: 'fa-user-doctor' }
        ];

        function renderSuggestions(query) {
            if (!query) {
                suggestBox.classList.remove('open');
                suggestBox.innerHTML = '';
                return;
            }
            const matches = suggestData.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.tag.toLowerCase().includes(query.toLowerCase())
            );

            if (matches.length === 0) {
                suggestBox.innerHTML = `<div class="suggest-empty">No matches found for "${query}". Try a different name or specialty.</div>`;
            } else {
                suggestBox.innerHTML = matches.slice(0, 6).map(item => `
                    <div class="suggest-item" data-name="${item.name}">
                        <i class="fa-solid ${item.icon}"></i>
                        <span>${item.name}</span>
                        <span class="suggest-tag">${item.tag}</span>
                    </div>
                `).join('');
            }
            suggestBox.classList.add('open');
        }

        searchInput.addEventListener('input', (e) => renderSuggestions(e.target.value.trim()));
        searchInput.addEventListener('focus', (e) => { if (e.target.value.trim()) renderSuggestions(e.target.value.trim()); });

        suggestBox.addEventListener('click', (e) => {
            const item = e.target.closest('.suggest-item');
            if (!item) return;
            searchInput.value = item.getAttribute('data-name');
            suggestBox.classList.remove('open');
            executeSearchRedirect();
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('#search-section') && !e.target.closest('#search-suggestions')) {
                suggestBox.classList.remove('open');
            }
        });
    }

    /* ==========================================
       5. Search Enter Key Listener
       ========================================== */
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                executeSearchRedirect();
            }
        });
    }

    /* ==========================================
       6. Scroll Reveal Observer
       ========================================== */
    const revealSections = document.querySelectorAll('.service-card, .doctor-card, .stat-card, .testimonial-card, .section-title');
    if (revealSections.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('reveal-active');
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        revealSections.forEach(section => {
            section.classList.add('reveal-hidden');
            revealObserver.observe(section);
        });
    }

    /* ==========================================
       7. Book Appointment Buttons
       ========================================== */
    const bookButtons = document.querySelectorAll('.book-btn, .cta-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', () => {
            showToast("🎉 Appointment Token Generated! Redirecting safely...", "success");
        });
    });
});

/* ==========================================
   8. Service Click Master Handler & Modals Logic
   ========================================== */
function handleServiceClick(serviceType) {
    switch (serviceType) {
        case 'video':
            startVideoConsultationFlow();
            break;

        case 'find-doctors':
            scrollToSearch();
            break;

        case 'lab-tests':
            openModal('Book Diagnostic Lab Test', `
                <p style="margin-bottom:15px; color:#64748b;">Select packages for safe home sample collection:</p>
                <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:15px;">
                    <label style="padding:10px; border:1px solid #cbd5e1; border-radius:8px; cursor:pointer; display:flex; justify-content:space-between;">
                        <span><input type="radio" name="lab-pkg" checked> Full Body Checkup</span>
                        <strong style="color:#0284c7;">৳1,499</strong>
                    </label>
                    <label style="padding:10px; border:1px solid #cbd5e1; border-radius:8px; cursor:pointer; display:flex; justify-content:space-between;">
                        <span><input type="radio" name="lab-pkg"> Diabetes Profile</span>
                        <strong style="color:#0284c7;">৳699</strong>
                    </label>
                </div>
                <button onclick="showToast('Sample Collection Scheduled!', 'success'); closeModal();" style="width:100%; padding:12px; background:#0284c7; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Confirm Booking</button>
            `);
            break;

        case 'hospitals':
            openModal('Partner Hospitals Nearby', `
                <p style="margin-bottom:15px; color:#64748b;">Top trusted hospitals in your location:</p>
                <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:10px; margin-bottom:15px;">
                    <li style="padding:10px; background:rgba(2,132,199,0.05); border-radius:8px; display:flex; justify-content:space-between;">
                        <span>🏥 Square Hospital</span> <span style="font-size:0.85rem; color:#10b981;">ICU Bed Available</span>
                    </li>
                    <li style="padding:10px; background:rgba(2,132,199,0.05); border-radius:8px; display:flex; justify-content:space-between;">
                        <span>🏥 Labaid Specialized</span> <span style="font-size:0.85rem; color:#10b981;">Emergency Open</span>
                    </li>
                </ul>
                <button onclick="closeModal();" style="width:100%; padding:10px; background:#64748b; color:#fff; border:none; border-radius:8px; cursor:pointer;">Close</button>
            `);
            break;

        case 'medicine':
            openModal('Order Genuine Medicines', `
                <p style="margin-bottom:15px; color:#64748b;">Upload your prescription picture to get delivery within 2 hours:</p>
                <div style="border:2px dashed #0284c7; padding:20px; text-align:center; border-radius:10px; margin-bottom:15px; background:rgba(2,132,199,0.02); cursor:pointer;">
                    <i class="fa-solid fa-cloud-arrow-up" style="font-size:2rem; color:#0284c7; margin-bottom:8px;"></i>
                    <p style="margin:0; font-size:0.9rem; font-weight:600;">Drag & Drop or Click to Upload Prescription</p>
                </div>
                <button onclick="showToast('Prescription Uploaded! Reviewing by Pharmacist.', 'success'); closeModal();" style="width:100%; padding:12px; background:#0284c7; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Order Now</button>
            `);
            break;

        case 'ai-checker':
            openModal('🤖 AI Symptom Checker', `
                <p style="margin-bottom:10px; color:#64748b;">Describe what you are feeling (e.g., severe headache, chest pain, fever):</p>
                <textarea id="ai-symptom-input" rows="3" placeholder="Enter symptoms here..." style="width:100%; padding:10px; border-radius:8px; border:1px solid #cbd5e1; margin-bottom:12px; font-family:inherit;"></textarea>
                <button onclick="analyzeSymptomsWithAI()" style="width:100%; padding:12px; background:#8b5cf6; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Analyze with AI</button>
                <div id="ai-result" style="margin-top:12px; font-size:0.9rem;"></div>
            `);
            break;

        case 'blood-donor':
            openModal('🩸 Emergency Blood Donor Network', `
                <p style="margin-bottom:12px; color:#64748b;">Select required blood group for instant donor search:</p>
                <select id="blood-group-select" style="width:100%; padding:10px; border-radius:8px; border:1px solid #cbd5e1; margin-bottom:15px; font-weight:600;">
                    <option value="A+">A Positive (A+)</option>
                    <option value="B+">B Positive (B+)</option>
                    <option value="O+">O Positive (O+)</option>
                    <option value="AB+">AB Positive (AB+)</option>
                    <option value="O-">O Negative (O-)</option>
                </select>
                <button onclick="searchBloodDonorsLogic()" style="width:100%; padding:12px; background:#ef4444; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Search Emergency Donors</button>
                <div id="donor-results" style="margin-top:12px;"></div>
            `);
            break;

        case 'family':
            openModal('👨‍👩‍👧 Family Health Dashboard', `
                <p style="margin-bottom:12px; color:#64748b;">Select family profile to view medical records:</p>
                <div style="display:flex; gap:10px; margin-bottom:15px;">
                    <button style="flex:1; padding:10px; border:1px solid #0284c7; background:rgba(2,132,199,0.1); color:#0284c7; border-radius:8px; font-weight:600;">Self</button>
                    <button style="flex:1; padding:10px; border:1px solid #cbd5e1; background:transparent; border-radius:8px;">Father</button>
                    <button style="flex:1; padding:10px; border:1px solid #cbd5e1; background:transparent; border-radius:8px;">Mother</button>
                </div>
                <p style="font-size:0.85rem; color:#10b981;">✓ 4 Prescriptions & 2 Lab Reports synced.</p>
            `);
            break;

        case 'health-checkup':
            openModal('🩺 Preventive Health Checkup Packages', `
                <p style="margin-bottom:15px; color:#64748b;">Choose a customized package based on your age & lifestyle:</p>
                <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:15px;">
                    <label style="padding:10px; border:1px solid #cbd5e1; border-radius:8px; cursor:pointer; display:flex; justify-content:space-between;">
                        <span><input type="radio" name="checkup-pkg" checked> Basic Wellness Package</span>
                        <strong style="color:#0284c7;">৳999</strong>
                    </label>
                    <label style="padding:10px; border:1px solid #cbd5e1; border-radius:8px; cursor:pointer; display:flex; justify-content:space-between;">
                        <span><input type="radio" name="checkup-pkg"> Advanced Executive Package</span>
                        <strong style="color:#0284c7;">৳2,499</strong>
                    </label>
                    <label style="padding:10px; border:1px solid #cbd5e1; border-radius:8px; cursor:pointer; display:flex; justify-content:space-between;">
                        <span><input type="radio" name="checkup-pkg"> Senior Citizen Package</span>
                        <strong style="color:#0284c7;">৳1,799</strong>
                    </label>
                </div>
                <button onclick="showToast('Health Checkup Package Booked!', 'success'); closeModal();" style="width:100%; padding:12px; background:#0284c7; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">View & Book Package</button>
            `);
            break;

        case 'insurance':
            openModal('📋 Insurance Claim Helper', `
                <p style="margin-bottom:12px; color:#64748b;">Submit quick details for hassle-free claim approval:</p>
                <input type="text" placeholder="Insurance Policy Number" style="width:100%; padding:10px; border-radius:8px; border:1px solid #cbd5e1; margin-bottom:10px;">
                <input type="text" placeholder="Hospital / Diagnostic Center Name" style="width:100%; padding:10px; border-radius:8px; border:1px solid #cbd5e1; margin-bottom:15px;">
                <button onclick="showToast('Claim Submitted Successfully!', 'success'); closeModal();" style="width:100%; padding:12px; background:#10b981; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Submit Claim</button>
            `);
            break;

        default:
            showToast("Redirecting to service details...", "info");
    }
}

/* ==========================================
   9. AI Symptom & Blood Donor Logic Helper
   ========================================== */
function analyzeSymptomsWithAI() {
    const inputEl = document.getElementById('ai-symptom-input');
    const resBox = document.getElementById('ai-result');
    if (!inputEl || !resBox) return;

    const text = inputEl.value.trim();
    if (!text) {
        resBox.innerHTML = `<span style="color:#ef4444;">Please describe your symptoms first!</span>`;
        return;
    }
    resBox.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="color:#8b5cf6;"></i> AI is analyzing symptoms...`;

    setTimeout(() => {
        resBox.innerHTML = `
            <div style="background:rgba(139,92,246,0.1); padding:10px; border-radius:8px; border-left:4px solid #8b5cf6;">
                <strong>Recommended Specialist:</strong> General Physician / Cardiologist.<br>
                <small style="color:#64748b;">Suggested Action: Book an in-clinic consultation soon.</small>
            </div>
        `;
    }, 1200);
}

function searchBloodDonorsLogic() {
    const selectEl = document.getElementById('blood-group-select');
    const res = document.getElementById('donor-results');
    if (!selectEl || !res) return;

    const bg = selectEl.value;
    res.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="color:#ef4444;"></i> Searching donors for ${bg}...`;

    setTimeout(() => {
        res.innerHTML = `
            <div style="background:rgba(239,68,68,0.08); padding:10px; border-radius:8px; font-size:0.85rem; color:#ef4444;">
                ❤️ <strong>3 Donors Found</strong> near your area for blood group ${bg}.
            </div>
        `;
    }, 1000);
}

/* ==========================================
   10. Custom Reusable Modal Engine
   ========================================== */
function openModal(title, htmlContent, options = {}) {
    closeModal(); // Close any existing modal first (also stops camera if one was running)
    const modalWrap = document.createElement('div');
    modalWrap.id = 'curelink-custom-modal';
    modalWrap.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; backdrop-filter:blur(4px); z-index:10000; display:flex; align-items:center; justify-content:center; padding:15px; background:rgba(0,0,0,0.5);';

    const maxWidth = options.maxWidth || '440px';
    const hideHeader = options.hideHeader === true;

    modalWrap.innerHTML = `
        <div style="background:#fff; color:#0f172a; width:100%; max-width:${maxWidth}; border-radius:16px; padding:${hideHeader ? '0' : '20px'}; box-shadow:0 20px 40px rgba(0,0,0,0.2); position:relative; animation:modalPop 0.3s ease; overflow:hidden;">
            ${hideHeader ? '' : `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <h3 style="margin:0; font-size:1.15rem; font-weight:700;">${title}</h3>
                <i class="fa-solid fa-xmark" onclick="closeModal()" style="cursor:pointer; font-size:1.2rem; color:#64748b;"></i>
            </div>`}
            <div>${htmlContent}</div>
        </div>
    `;

    document.body.appendChild(modalWrap);
}

function closeModal() {
    // Safety: if a video-consultation camera stream is active, stop it before removing the modal
    if (typeof vcStopCamera === 'function') vcStopCamera();

    const el = document.getElementById('curelink-custom-modal');
    if (el) el.remove();
}

/* ==========================================
   10b. Video Consultation — Full 6-Step Flow
   Step 1: Overview -> Step 2: Intake Form -> Step 3: Doctor Matching
   Step 4: Waiting Room (real camera preview) -> Step 5: Live Call Room
   Step 6: Post-Consultation (prescription + medicine + rating)
   ========================================== */
const vcState = {
    patientFor: 'self',
    symptoms: '',
    doctor: null,
    cameraStream: null,
    micOn: true,
    camOn: true,
    facingMode: 'user',
    rating: 0
};

const VC_DOCTOR_POOL = [
    { name: 'Dr. Ayesha Rahman', degree: 'MBBS, FCPS (Medicine)', experience: '9 yrs experience', rating: '4.8' },
    { name: 'Dr. Farhan Islam', degree: 'MBBS, MD (General Physician)', experience: '6 yrs experience', rating: '4.7' },
    { name: 'Dr. Nusrat Jahan', degree: 'MBBS, DCH (Pediatrician)', experience: '8 yrs experience', rating: '4.9' }
];

function startVideoConsultationFlow() {
    vcState.patientFor = 'self';
    vcState.symptoms = '';
    vcState.doctor = null;
    vcState.rating = 0;
    vcRenderOverview();
}

/* ---- Step 1: Instant Overview ---- */
function vcRenderOverview() {
    openModal('Instant Video Consultation', `
        <p style="margin-bottom:15px; color:#64748b;">Connect with a top doctor online in less than 2 minutes.</p>
        <div style="background:rgba(16,185,129,0.1); padding:12px; border-radius:8px; border-left:4px solid #10b981; margin-bottom:12px;">
            <i class="fa-solid fa-circle-check" style="color:#10b981;"></i> <strong>14 Doctors</strong> are currently live online.
        </div>
        <div style="display:flex; gap:10px; margin-bottom:12px;">
            <div style="flex:1; background:#f8fafc; padding:10px; border-radius:8px; text-align:center;">
                <div style="font-size:0.75rem; color:#64748b;">Avg. Wait Time</div>
                <div style="font-weight:700; color:#0f172a;">&lt; 2 min</div>
            </div>
            <div style="flex:1; background:#f8fafc; padding:10px; border-radius:8px; text-align:center;">
                <div style="font-size:0.75rem; color:#64748b;">Consultation Fee</div>
                <div style="font-weight:700; color:#0f172a;">৳500</div>
            </div>
        </div>
        <div style="margin-bottom:15px;">
            <label style="font-size:0.85rem; font-weight:600; color:#334155;">Preferred Specialty</label>
            <select id="vc-specialty" style="width:100%; padding:10px; border-radius:8px; border:1px solid #cbd5e1; margin-top:6px;">
                <option>General Physician</option>
                <option>Pediatrician</option>
                <option>Gynecologist</option>
                <option>Dermatologist</option>
            </select>
        </div>
        <button onclick="vcRenderIntakeForm()" style="width:100%; padding:12px; background:#0284c7; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Start Consultation Now</button>
    `);
}

/* ---- Step 2: Patient Intake Form ---- */
function vcRenderIntakeForm() {
    openModal('Tell Us a Little About the Patient', `
        <div style="margin-bottom:14px;">
            <label style="font-size:0.85rem; font-weight:600; color:#334155;">Who is this consultation for?</label>
            <div style="display:flex; gap:10px; margin-top:6px;">
                <button type="button" onclick="vcSetPatientFor('self', this)" class="vc-toggle-btn vc-toggle-active" style="flex:1; padding:10px; border-radius:8px; border:1px solid #0284c7; background:rgba(2,132,199,0.1); color:#0284c7; font-weight:600; cursor:pointer;">Self</button>
                <button type="button" onclick="vcSetPatientFor('family', this)" class="vc-toggle-btn" style="flex:1; padding:10px; border-radius:8px; border:1px solid #cbd5e1; background:transparent; cursor:pointer;">Family Member</button>
            </div>
        </div>
        <div style="margin-bottom:14px;">
            <label style="font-size:0.85rem; font-weight:600; color:#334155;">Briefly describe the problem</label>
            <textarea id="vc-symptoms" rows="3" placeholder="e.g. Fever and cough for 2 days" style="width:100%; padding:10px; border-radius:8px; border:1px solid #cbd5e1; margin-top:6px; font-family:inherit;"></textarea>
        </div>
        <div style="margin-bottom:15px;">
            <label style="font-size:0.85rem; font-weight:600; color:#334155;">Attach old prescription / report (optional)</label>
            <div style="border:2px dashed #cbd5e1; padding:14px; text-align:center; border-radius:8px; margin-top:6px; color:#64748b; font-size:0.85rem; cursor:pointer;">
                <i class="fa-solid fa-paperclip"></i> Click to attach a file
            </div>
        </div>
        <button onclick="vcSubmitIntake()" style="width:100%; padding:12px; background:#0284c7; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Proceed to Connect</button>
    `);
}

function vcSetPatientFor(who, btnEl) {
    vcState.patientFor = who;
    document.querySelectorAll('.vc-toggle-btn').forEach(b => {
        b.style.border = '1px solid #cbd5e1';
        b.style.background = 'transparent';
        b.style.color = '#0f172a';
    });
    btnEl.style.border = '1px solid #0284c7';
    btnEl.style.background = 'rgba(2,132,199,0.1)';
    btnEl.style.color = '#0284c7';
}

function vcSubmitIntake() {
    const symptomsEl = document.getElementById('vc-symptoms');
    vcState.symptoms = symptomsEl ? symptomsEl.value.trim() : '';
    vcRenderMatching();
}

/* ---- Step 3: Doctor Searching / Matching Animation ---- */
function vcRenderMatching() {
    openModal('Finding Your Doctor', `
        <div style="text-align:center; padding:10px 0 20px;">
            <i class="fa-solid fa-satellite-dish fa-spin" style="font-size:2.2rem; color:#0284c7;"></i>
            <p style="margin-top:14px; color:#64748b; font-size:0.9rem;">Searching available General Physician for you...</p>
        </div>
    `);

    setTimeout(() => {
        vcState.doctor = VC_DOCTOR_POOL[Math.floor(Math.random() * VC_DOCTOR_POOL.length)];
        vcRenderDoctorFound();
    }, 2200);
}

function vcRenderDoctorFound() {
    const d = vcState.doctor;
    openModal('Doctor Found!', `
        <div style="background:#f8fafc; border-radius:12px; padding:16px; text-align:center; margin-bottom:15px;">
            <div style="width:64px; height:64px; border-radius:50%; background:#0284c7; color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.5rem; margin:0 auto 10px;">
                <i class="fa-solid fa-user-doctor"></i>
            </div>
            <h4 style="margin:0 0 4px;">${d.name}</h4>
            <p style="margin:0; color:#64748b; font-size:0.85rem;">${d.degree}</p>
            <p style="margin:4px 0 0; color:#64748b; font-size:0.85rem;">${d.experience} &nbsp;•&nbsp; <i class="fa-solid fa-star" style="color:#f59e0b;"></i> ${d.rating}</p>
        </div>
        <button onclick="vcRenderWaitingRoom()" style="width:100%; padding:12px; background:#10b981; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Join Waiting Room</button>
    `);
}

/* ---- Step 4: Virtual Waiting Room (real camera preview) ---- */
function vcRenderWaitingRoom() {
    openModal('Virtual Waiting Room', `
        <div style="background:#0f172a; border-radius:12px; overflow:hidden; margin-bottom:15px; position:relative; aspect-ratio:4/3;">
            <video id="vc-self-preview" autoplay muted playsinline style="width:100%; height:100%; object-fit:cover; display:block;"></video>
            <div id="vc-cam-status" style="position:absolute; bottom:8px; left:8px; background:rgba(0,0,0,0.6); color:#fff; font-size:0.75rem; padding:4px 8px; border-radius:6px;">Requesting camera access...</div>
        </div>
        <p style="text-align:center; color:#64748b; font-size:0.9rem; margin-bottom:15px;">
            <i class="fa-solid fa-circle-notch fa-spin" style="color:#0284c7;"></i>
            ${vcState.doctor ? vcState.doctor.name : 'Doctor'} is joining the video call...
        </p>
        <button onclick="vcStartCall()" style="width:100%; padding:12px; background:#0284c7; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Continue</button>
    `);

    vcRequestCamera();

    // Auto-advance to the call after a short wait, like a real waiting room
    setTimeout(() => {
        // Only auto-advance if the waiting room modal is still open
        if (document.getElementById('vc-self-preview')) {
            vcStartCall();
        }
    }, 3500);
}

function vcRequestCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        vcUpdateCamStatus('Camera not supported on this browser/device.');
        return;
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: vcState.facingMode }, audio: true })
        .then(stream => {
            vcState.cameraStream = stream;
            const videoEl = document.getElementById('vc-self-preview');
            if (videoEl) videoEl.srcObject = stream;
            vcUpdateCamStatus('Camera connected');
        })
        .catch(() => {
            vcUpdateCamStatus('Camera/Mic permission denied — you can still continue with audio-only.');
        });
}

function vcUpdateCamStatus(text) {
    const el = document.getElementById('vc-cam-status');
    if (el) el.textContent = text;
}

function vcStopCamera() {
    if (vcState.cameraStream) {
        vcState.cameraStream.getTracks().forEach(track => track.stop());
        vcState.cameraStream = null;
    }
}

/* ---- Step 5: Live Video Call Room ---- */
function vcStartCall() {
    const d = vcState.doctor || { name: 'Your Doctor' };

    openModal('', `
        <div style="position:relative; background:#0f172a; aspect-ratio:9/13; max-height:70vh; width:100%;">
            <!-- "Doctor" video feed (simulated with an avatar since there's no real doctor on the other end) -->
            <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff;">
                <div style="width:88px; height:88px; border-radius:50%; background:#0284c7; display:flex; align-items:center; justify-content:center; font-size:2.2rem; margin-bottom:10px;">
                    <i class="fa-solid fa-user-doctor"></i>
                </div>
                <div style="font-weight:600;">${d.name}</div>
                <div style="font-size:0.8rem; color:#94a3b8; margin-top:4px;">Connected • 00:00</div>
            </div>

            <!-- Self video preview (real camera) -->
            <div style="position:absolute; top:12px; right:12px; width:90px; height:120px; border-radius:10px; overflow:hidden; border:2px solid #fff; background:#000;">
                <video id="vc-call-self-video" autoplay muted playsinline style="width:100%; height:100%; object-fit:cover;"></video>
            </div>

            <!-- Live chat panel (hidden by default) -->
            <div id="vc-chat-panel" style="display:none; position:absolute; bottom:70px; left:10px; right:10px; max-height:150px; overflow-y:auto; background:rgba(255,255,255,0.95); border-radius:10px; padding:10px; font-size:0.8rem;">
                <div style="color:#64748b; text-align:center;">Chat with ${d.name} here.</div>
            </div>

            <!-- Call controls -->
            <div style="position:absolute; bottom:0; left:0; right:0; padding:14px; display:flex; justify-content:center; gap:12px; background:linear-gradient(transparent, rgba(0,0,0,0.5));">
                <button onclick="vcToggleMic(this)" title="Mute/Unmute" style="width:44px; height:44px; border-radius:50%; border:none; background:rgba(255,255,255,0.15); color:#fff; cursor:pointer;"><i class="fa-solid fa-microphone"></i></button>
                <button onclick="vcToggleCam(this)" title="Camera On/Off" style="width:44px; height:44px; border-radius:50%; border:none; background:rgba(255,255,255,0.15); color:#fff; cursor:pointer;"><i class="fa-solid fa-video"></i></button>
                <button onclick="vcFlipCamera()" title="Flip Camera" style="width:44px; height:44px; border-radius:50%; border:none; background:rgba(255,255,255,0.15); color:#fff; cursor:pointer;"><i class="fa-solid fa-camera-rotate"></i></button>
                <button onclick="vcToggleChat()" title="Live Chat" style="width:44px; height:44px; border-radius:50%; border:none; background:rgba(255,255,255,0.15); color:#fff; cursor:pointer;"><i class="fa-solid fa-comment-dots"></i></button>
                <button onclick="vcEndCall()" title="End Call" style="width:44px; height:44px; border-radius:50%; border:none; background:#ef4444; color:#fff; cursor:pointer;"><i class="fa-solid fa-phone-slash"></i></button>
            </div>
        </div>
    `, { maxWidth: '360px', hideHeader: true });

    // Re-attach the already-granted camera stream to this step's video element
    const callVideoEl = document.getElementById('vc-call-self-video');
    if (callVideoEl && vcState.cameraStream) {
        callVideoEl.srcObject = vcState.cameraStream;
    } else if (!vcState.cameraStream) {
        vcRequestCameraForCall();
    }
}

function vcRequestCameraForCall() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    navigator.mediaDevices.getUserMedia({ video: { facingMode: vcState.facingMode }, audio: true })
        .then(stream => {
            vcState.cameraStream = stream;
            const callVideoEl = document.getElementById('vc-call-self-video');
            if (callVideoEl) callVideoEl.srcObject = stream;
        })
        .catch(() => { /* audio-only fallback, silently continue */ });
}

function vcToggleMic(btnEl) {
    vcState.micOn = !vcState.micOn;
    if (vcState.cameraStream) {
        vcState.cameraStream.getAudioTracks().forEach(t => t.enabled = vcState.micOn);
    }
    btnEl.innerHTML = vcState.micOn ? '<i class="fa-solid fa-microphone"></i>' : '<i class="fa-solid fa-microphone-slash"></i>';
    btnEl.style.background = vcState.micOn ? 'rgba(255,255,255,0.15)' : '#ef4444';
}

function vcToggleCam(btnEl) {
    vcState.camOn = !vcState.camOn;
    if (vcState.cameraStream) {
        vcState.cameraStream.getVideoTracks().forEach(t => t.enabled = vcState.camOn);
    }
    btnEl.innerHTML = vcState.camOn ? '<i class="fa-solid fa-video"></i>' : '<i class="fa-solid fa-video-slash"></i>';
    btnEl.style.background = vcState.camOn ? 'rgba(255,255,255,0.15)' : '#ef4444';
}

function vcFlipCamera() {
    vcState.facingMode = vcState.facingMode === 'user' ? 'environment' : 'user';
    vcStopCamera();
    vcRequestCameraForCall();
    showToast('Camera flipped', 'success');
}

function vcToggleChat() {
    const panel = document.getElementById('vc-chat-panel');
    if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function vcEndCall() {
    vcStopCamera();
    vcRenderPostConsultation();
}

/* ---- Step 6: Post-Consultation (prescription, medicine order, rating) ---- */
function vcRenderPostConsultation() {
    openModal('Consultation Complete', `
        <div id="vc-prescription-status" style="text-align:center; padding:10px 0;">
            <i class="fa-solid fa-file-medical fa-spin" style="font-size:2rem; color:#0284c7;"></i>
            <p style="margin-top:12px; color:#64748b; font-size:0.9rem;">Your prescription is being prepared...</p>
        </div>
    `);

    setTimeout(() => {
        const box = document.getElementById('vc-prescription-status');
        if (!box) return;
        box.innerHTML = `
            <div style="background:rgba(16,185,129,0.1); border-left:4px solid #10b981; padding:12px; border-radius:8px; margin-bottom:14px; text-align:left;">
                <i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Prescription is ready.
            </div>
            <button onclick="showToast('Prescription PDF downloaded!', 'success')" style="width:100%; padding:12px; background:#0f172a; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer; margin-bottom:10px;">
                <i class="fa-solid fa-download"></i> Download Prescription
            </button>
            <button onclick="showToast('Redirecting to Medicine Store...', 'success'); closeModal();" style="width:100%; padding:12px; background:#0284c7; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer; margin-bottom:16px;">
                <i class="fa-solid fa-pills"></i> Order Prescribed Medicines
            </button>
            <div style="text-align:center;">
                <p style="margin:0 0 8px; font-size:0.85rem; color:#64748b;">Rate your consultation</p>
                <div id="vc-star-rating">
                    ${[1, 2, 3, 4, 5].map(n => `<i class="fa-solid fa-star" data-star="${n}" onclick="vcSetRating(${n})" style="font-size:1.4rem; color:#cbd5e1; cursor:pointer; margin:0 2px;"></i>`).join('')}
                </div>
            </div>
        `;
    }, 1500);
}

function vcSetRating(n) {
    vcState.rating = n;
    document.querySelectorAll('#vc-star-rating i').forEach(star => {
        const starVal = parseInt(star.getAttribute('data-star'), 10);
        star.style.color = starVal <= n ? '#f59e0b' : '#cbd5e1';
    });
    showToast(`Thanks for your ${n}-star rating!`, 'success');
}

/* ==========================================
   11. Global Router: Search Redirect
   (single, clean version — loading state + safe redirect combined)
   ========================================== */
function executeSearchRedirect() {
    const locationEl = document.getElementById('search-location');
    const searchInputEl = document.getElementById('dynamic-search');
    const btn = document.getElementById('search-btn');

    const locationVal = locationEl ? locationEl.value : '';
    const queryVal = searchInputEl ? searchInputEl.value.trim() : '';

    if (btn) {
        if (btn.classList.contains('loading')) return;
        btn.classList.add('loading');
    }

    setTimeout(() => {
        if (btn) btn.classList.remove('loading');
        window.location.href = `search.html?query=${encodeURIComponent(queryVal)}&location=${encodeURIComponent(locationVal)}`;
    }, 600);
}

/* ==========================================
   12. Smooth Navigation & Focus Utility
   (restored accessibility: prefers-reduced-motion + scrollend precision,
    with graceful fallback for older browsers)
   ========================================== */
function scrollToSearch() {
    const searchSection = document.getElementById('search-section');

    if (!searchSection) {
        console.error("CureLink Layout Error: Target element '#search-section' was not found.");
        return;
    }

    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    searchSection.scrollIntoView({
        behavior: hasReducedMotion ? 'auto' : 'smooth',
        block: 'center'
    });

    const searchInput = document.getElementById('dynamic-search');
    if (searchInput) {
        if ('onscrollend' in window) {
            window.addEventListener('scrollend', function onScrollEndHandler() {
                triggerFocusAndGlow(searchInput);
                window.removeEventListener('scrollend', onScrollEndHandler); // avoid memory leak
            }, { once: true });
        } else {
            // Fallback for browsers without 'scrollend' support
            setTimeout(() => triggerFocusAndGlow(searchInput), 600);
        }
    }
}

function triggerFocusAndGlow(inputElement) {
    inputElement.focus({ preventScroll: true }); // avoid re-triggering a scroll jump
    inputElement.classList.add('search-glow-active');
    setTimeout(() => {
        inputElement.classList.remove('search-glow-active');
    }, 1000);
}

/* ==========================================
   13. Toast Notification Engine
   (restored: CSS-class based, so your .toast-card / .visible styles in CSS work again)
   ========================================== */
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-card ${type}`;

    const icon = type === 'success' ? 'fa-circle-check' : (type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info');

    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <div class="toast-content">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add('visible'), 50);

    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}