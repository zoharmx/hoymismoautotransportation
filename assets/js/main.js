        document.addEventListener('DOMContentLoaded', () => {
             // Mobile Menu Toggle
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
             // Close mobile menu when a link is clicked
            mobileMenu.addEventListener('click', (e) => {
                 if(e.target.tagName === 'A') {
                    mobileMenu.classList.add('hidden');
                }
            });


             // Header Shadow on Scroll
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 10) {
                    header.classList.add('header-shadow');
                } else {
                    header.classList.remove('header-shadow');
                }
            });

             // "Intelligent" Instant Quote Form
            const quoteForm = document.getElementById('instant-quote-form');
            const quoteResult = document.getElementById('quote-result');
            const vehicleSelect = document.getElementById('vehicle');

            quoteForm.addEventListener('submit', (e) => {
                e.preventDefault();
                quoteResult.innerHTML = `<div class="flex items-center justify-center gap-2"><i class="fas fa-spinner fa-spin"></i> <span>Analizando ruta y vehículo...</span></div>`;
                
                setTimeout(() => {
                    // Simulate base price calculation
                    const basePrices = [850, 920, 1050, 1100];
                    const basePrice = basePrices[Math.floor(Math.random() * basePrices.length)];
                    
                    // Simulate vehicle surcharge
                    const selectedVehicleType = vehicleSelect.value;
                    let vehicleSurcharge = 0;
                    switch (selectedVehicleType) {
                        case 'SUV':
                            vehicleSurcharge = 150;
                            break;
                        case 'Pickup Truck':
                            vehicleSurcharge = 200;
                            break;
                        case 'Clásico / Exótico':
                            vehicleSurcharge = 450; // Higher risk/care
                            break;
                        case 'Motocicleta':
                            vehicleSurcharge = -50; // Less space
                            break;
                        default: // Sedán
                            vehicleSurcharge = 0;
                    }

                    const totalPrice = basePrice + vehicleSurcharge;

                    // Display detailed quote
                    quoteResult.innerHTML = `
                        <div class="text-left text-sm">
                            <div class="flex justify-between border-b pb-1"><span>Tarifa Base:</span> <strong>$${basePrice}.00</strong></div>
                            <div class="flex justify-between border-b py-1"><span>Ajuste por Vehículo (${selectedVehicleType}):</span> <strong>$${vehicleSurcharge}.00</strong></div>
                            <div class="flex justify-between text-lg font-bold pt-2"><span>Total Estimado:</span> <span class="text-green-600">$${totalPrice}.00</span></div>
                        </div>
                        <small class="text-gray-500 font-normal block mt-2">Esta es una cotización preliminar. Un asesor se pondrá en contacto para confirmar los detalles.</small>
                    `;
                }, 2000); // Increased delay for realism
            });

             // FAQ Accordion
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-item-question');
                const answer = item.querySelector('.faq-item-answer');
                question.addEventListener('click', () => {
                    const wasActive = question.classList.contains('active');

                     // Close all others
                    document.querySelectorAll('.faq-item-question').forEach(q => q.classList.remove('active'));
                    document.querySelectorAll('.faq-item-answer').forEach(a => a.style.display = 'none');
                    
                    if (!wasActive) {
                       question.classList.add('active');
                       answer.style.display = 'block';
                    }
                });
            });

             // Dynamic Shipment Ticker
            const shipmentTicker = document.getElementById('shipment-ticker');
            if (shipmentTicker) {
                const shipments = [
                    { vehicle: 'Sedán', from: 'Miami, FL', to: 'Dallas, TX' },
                    { vehicle: 'SUV', from: 'Los Angeles, CA', to: 'Seattle, WA' },
                    { vehicle: 'Pickup Truck', from: 'Denver, CO', to: 'Phoenix, AZ' },
                    { vehicle: 'Motocicleta', from: 'New York, NY', to: 'Chicago, IL' },
                    { vehicle: 'Clásico', from: 'San Francisco, CA', to: 'Las Vegas, NV' }
                ];
                let shipmentIndex = 0;

                const updateTicker = () => {
                    // Fade out
                    shipmentTicker.classList.remove('opacity-100');

                    setTimeout(() => {
                        // Update content
                        const shipment = shipments[shipmentIndex];
                        shipmentTicker.innerHTML = `
                            <i class="fas fa-shipping-fast text-hm-orange"></i> Recientemente enviado: <strong>${shipment.vehicle}</strong> desde <strong>${shipment.from}</strong> hacia <strong>${shipment.to}</strong>
                        `;
                        // Fade in
                        shipmentTicker.classList.add('opacity-100');
                        
                        // Move to next shipment
                        shipmentIndex = (shipmentIndex + 1) % shipments.length;
                    }, 500); // Half a second for fade out
                };
                
                // Initial call and interval
                setTimeout(updateTicker, 1000); // Initial delay
                setInterval(updateTicker, 5000); // Update every 5 seconds
            }

            // Scroll Animations
            const sectionsToAnimate = document.querySelectorAll('section[id]');
            
            const observerOptions = {
                root: null, // relative to document viewport 
                rootMargin: '0px',
                threshold: 0.1 // 10% of the item must be visible
            };

            const observerCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target); // Stop observing once it's visible
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);

            sectionsToAnimate.forEach(section => {
                section.classList.add('fade-in-section'); // Add initial state class
                observer.observe(section);
            });

             // Set current year in footer
            document.getElementById('year').textContent = new Date().getFullYear();
        });
    