// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
      hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
      
      // Close menu when clicking on a link
      document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        });
      });
    }
    
    // Initialize services page functionality
    if (document.querySelector('.calculator')) {
      initCalculator();
    }
    
    // Initialize review page functionality
    if (document.querySelector('.stars')) {
      initStarRating();
    }
    
    // Initialize contact form validation
    if (document.getElementById('contact-form')) {
      initContactForm();
    }
    
    // Initialize review form functionality
    if (document.getElementById('review-form')) {
      initReviewForm();
    }
  });
  
  // Price Calculator for Services Page
  function initCalculator() {
    const passengerSelect = document.getElementById('passengers');
    const distanceInput = document.getElementById('distance');
    const calculateBtn = document.getElementById('calculate');
    const resultDiv = document.querySelector('.calculator-result');
    
    if (calculateBtn) {
      calculateBtn.addEventListener('click', function() {
        const passengers = parseInt(passengerSelect.value);
        const distance = parseFloat(distanceInput.value);
        
        if (isNaN(distance) || distance <= 0) {
          alert('Please enter a valid distance');
          return;
        }
        
        let pricePerKm;
        
        switch(passengers) {
          case 1: pricePerKm = 19.00; break;
          case 2: pricePerKm = 27.50; break;
          case 3: pricePerKm = 34.00; break;
          case 4: case 5: case 6: pricePerKm = 40.50; break;
          case 7: case 8: case 9: case 10: pricePerKm = 52.00; break;
          default: pricePerKm = 0;
        }
        
        if (pricePerKm === 0) {
          resultDiv.innerHTML = 'Please contact us for a quote for groups of 11+ people';
        } else {
          const totalPrice = (pricePerKm * distance).toFixed(2);
          resultDiv.innerHTML = `Estimated Price: R ${totalPrice}`;
        }
        
        resultDiv.style.display = 'block';
      });
    }
  }
  
  // Star Rating System
  function initStarRating() {
    const stars = document.querySelectorAll('.stars input');
    
    stars.forEach(star => {
      star.addEventListener('change', function() {
        const rating = this.value;
        // You could store this rating for form submission
        console.log(`Rating selected: ${rating} stars`);
      });
    });
  }
  
  // Contact Form Validation
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (name === '' || email === '' || message === '') {
          alert('Please fill in all required fields');
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address');
          return;
        }
        
        // If validation passes, you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      });
    }
  }
  
  // Review Form Functionality
  function initReviewForm() {
    const reviewForm = document.getElementById('review-form');
    
    if (reviewForm) {
      reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('review-name').value.trim();
        const reviewText = document.getElementById('review').value.trim();
        const rating = document.querySelector('input[name="rating"]:checked');
        
        if (!rating) {
          alert('Please select a rating');
          return;
        }
        
        if (name === '' || reviewText === '') {
          alert('Please fill in all fields');
          return;
        }
        
        // In a real application, you would send this data to a server
        // For demonstration, we'll add the review to the page
        addReviewToPage(name, rating.value, reviewText);
        reviewForm.reset();
        
        // Reset stars
        document.querySelectorAll('input[name="rating"]').forEach(star => {
          star.checked = false;
        });
      });
    }
  }
  
  // Function to add a review to the page (for demonstration)
  function addReviewToPage(name, rating, text) {
    const reviewsContainer = document.querySelector('.reviews-container');
    
    if (!reviewsContainer) {
      // Create reviews container if it doesn't exist
      const contentBox = document.querySelector('.content-box');
      const newReviewsContainer = document.createElement('div');
      newReviewsContainer.className = 'reviews-container';
      newReviewsContainer.innerHTML = '<h3>Customer Reviews</h3>';
      contentBox.appendChild(newReviewsContainer);
    }
    
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review';
    
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    
    reviewElement.innerHTML = `
      <div class="review-header">
        <strong>${name}</strong>
        <div class="review-rating">${stars}</div>
      </div>
      <p>${text}</p>
      <small>Posted just now</small>
    `;
    
    document.querySelector('.reviews-container').appendChild(reviewElement);
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });