/**
 * Pandai Sikek Heritage — Master Operational Interface Script
 * Core Architecture Framework for Production Environment
 */

'use strict';

document.addEventListener("DOMContentLoaded", function () {

    // ── 1. NAVBAR SCROLL ACTION ENGINE ──
    const globalHeader = document.querySelector('header.fixed-top, .ps-navbar');
    
    const onWindowScrollHandler = () => {
        if (!globalHeader) return;
        
        if (window.scrollY > 40) {
            globalHeader.classList.add("scrolled");
            // Penerapan bayangan khusus struktur kelas .ps-navbar
            if (globalHeader.classList.contains('ps-navbar')) {
                globalHeader.style.boxShadow = '0 2px 24px rgba(0,0,0,0.08)';
            }
        } else {
            globalHeader.classList.remove("scrolled");
            if (globalHeader.classList.contains('ps-navbar')) {
                globalHeader.style.boxShadow = 'none';
            }
        }
    };

    if (globalHeader) {
        window.addEventListener('scroll', onWindowScrollHandler, { passive: true });
        onWindowScrollHandler(); // Eksekusi check state awal saat refresh halaman
    }


    // ── 2. NEWSLETTER VALIDATION & CONTROL SUBSCRIPTION MODULE ──
    const subscribeBtn = document.getElementById('subscribeBtn');
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = newsletterForm ? newsletterForm.querySelector('input[type="email"]') : null;

    if (subscribeBtn && newsletterForm && emailInput) {
        subscribeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const emailValue = emailInput.value.trim();

            // Validasi format struktur Email Regex standar internasional
            if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
                emailInput.classList.add('is-invalid');
                emailInput.focus();
                return;
            }

            emailInput.classList.remove('is-invalid');

            /* Simulasi Pengiriman Payload Interaktif */
            subscribeBtn.disabled = true;
            const originalText = subscribeBtn.textContent;
            subscribeBtn.textContent = 'MENGIRIM…';

            setTimeout(() => {
                subscribeBtn.textContent = '✓ TERIMA KASIH';
                subscribeBtn.style.backgroundColor = '#795900';
                emailInput.value = '';
                
                // Kembalikan state tombol setelah beberapa detik
                setTimeout(() => {
                    subscribeBtn.disabled = false;
                    subscribeBtn.textContent = originalText;
                    subscribeBtn.style.backgroundColor = '';
                }, 3000);
            }, 1200);
        });

        /* Reset invalid state saat user mulai mengetik ulang */
        emailInput.addEventListener('input', function () {
            emailInput.classList.remove('is-invalid');
        });
    }


    // ── 3. PERFORMANCE LIGHTWEIGHT SCROLL REVEAL ENGINE (INTERSECTION OBSERVER) ──
    const revealTargets = document.querySelectorAll(
        '.ps-card, .ps-step, .ps-img-zoom, .ps-section h2, .ps-section p, .product-card, .weaver-card'
    );

    if (revealTargets.length > 0 && ('IntersectionObserver' in window)) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.12,
            rootMargin: "0px 0px -20px 0px"
        });

// Di main.js, ubah selektor target menjadi lebih spesifik (hindari text di dalam hero)
const revealTargets = document.querySelectorAll(
    '.ps-card, .ps-step, .ps-img-zoom, main section:not(.ps-hero) h2, main section:not(.ps-hero) p'
);
    }


    // ── 4. PRODUCT GALLERY SWAP SYSTEM (DETAIL PAGE INTERACTIVITY) ──
    const mainProductImage = document.getElementById("main-product-image");
    const thumbnails = document.querySelectorAll(".thumbnail-item");

    if (mainProductImage && thumbnails.length > 0) {
        thumbnails.forEach((thumb) => {
            thumb.addEventListener("click", function () {
                thumbnails.forEach((t) => {
                    t.classList.remove("active");
                    t.classList.add("opacity-60");
                });

                this.classList.add("active");
                this.classList.remove("opacity-60");

                const targetImgSrc = this.querySelector("img").getAttribute("src");
                mainProductImage.setAttribute("src", targetImgSrc);
            });
        });
    }


    // ── 5. MOBILE SIDEBAR FILTER CONTROLLER INTERFACE ──
    const filterToggleBtn = document.getElementById("filter-toggle-btn");
    const sidebarFilter = document.getElementById("sidebar-filter");

    if (filterToggleBtn && sidebarFilter) {
        filterToggleBtn.addEventListener("click", function (e) {
            e.preventDefault();
            sidebarFilter.classList.toggle("show-mobile-filter");
        });
    }
});