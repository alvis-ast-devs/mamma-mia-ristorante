document.addEventListener('DOMContentLoaded', () => {
    console.log("Mamma Mia Ristorante System is Initialize...");
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }
        });
    }

    const track = document.getElementById('categoryTrack');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    if (track && leftBtn && rightBtn) {
        leftBtn.addEventListener('click', () => {
            track.scrollBy({ left: -250, behavior: 'smooth' });
        });
        rightBtn.addEventListener('click', () => {
            track.scrollBy({ left: 250, behavior: 'smooth' });
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-item-card');

    if (filterBtns.length > 0 && menuCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');
                menuCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex'; 
                    } else {
                        card.style.display = 'none'; 
                    }
                });
            });
        });
    }

    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        const checkboxes = orderForm.querySelectorAll('input[name="additions"]');
        const totalPriceElement = document.querySelector('.total-price');
        
        checkboxes.forEach(box => {
            box.addEventListener('change', () => {
                let basePrice = 32;
                let additionsTotal = 0;
                checkboxes.forEach(cb => {
                    if (cb.checked) {
                        if (cb.value === 'truffle') additionsTotal += 25;
                        if (cb.value === 'parmesan') additionsTotal += 5;
                    }
                });
                const finalTotal = basePrice + additionsTotal;
                if (totalPriceElement) totalPriceElement.textContent = `$${finalTotal}`;
            });
        });
        
        const phoneInput = document.getElementById('phone');
        const nameInput = document.getElementById('fullName');
        const phoneGroup = document.getElementById('phoneGroup');
        const nameGroup = document.getElementById('nameGroup');
        const nameErrorMsg = nameGroup.querySelector('.error-msg');
        const phoneErrorMsg = phoneGroup.querySelector('.error-msg');

        const isAlpha = (str) => {
            for (let i = 0; i < str.length; i++) {
                let code = str.charCodeAt(i);
                if (!(code >= 65 && code <= 90) && !(code >= 97 && code <= 122) && code !== 32) {
                    return false;
                }
            }
            return true;
        };

      
        const isNumeric = (str) => {
            for (let i = 0; i < str.length; i++) {
                let code = str.charCodeAt(i);
                if (code < 48 || code > 57) {
                    if (i === 0 && str[i] === '+') continue; 
                    return false;
                }
            }
            return true;
        };

        const validateName = () => {
            let val = nameInput.value.trim();
            
            if (val === "") {
                nameGroup.classList.add('has-error');
                nameErrorMsg.textContent = "Name cannot be empty.";
                return false;
            }
         
            if (!isAlpha(val)) {
                nameGroup.classList.add('has-error');
                nameErrorMsg.textContent = "Name must only contain letters.";
                return false;
            }
        
            nameGroup.classList.remove('has-error');
            nameGroup.classList.add('is-valid');
            return true;
        };

        const validatePhone = () => {
            let val = phoneInput.value.trim();
            
            if (val === "") {
                phoneGroup.classList.add('has-error');
                phoneErrorMsg.textContent = "Phone number cannot be empty.";
                return false;
            }
            
            if (!isNumeric(val)) {
                phoneGroup.classList.add('has-error');
                phoneErrorMsg.textContent = "Phone must only contain numbers.";
                return false;
            }
        
            if (val.length < 8) {
                phoneGroup.classList.add('has-error');
                phoneErrorMsg.textContent = "Phone number must be at least 8 digits.";
                return false;
            }
         
            phoneGroup.classList.remove('has-error');
            phoneGroup.classList.add('is-valid');
            return true;
        };

        if (nameInput) nameInput.addEventListener('input', validateName);
        if (phoneInput) phoneInput.addEventListener('input', validatePhone);

       
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const isNameValid = validateName();
            const isPhoneValid = validatePhone();

            if (isNameValid && isPhoneValid) {
                alert(`Grazie, ${nameInput.value}! Your order has been placed successfully.`);
            } else {
                alert("Please fix the errors in the form before submitting.");
            }
        });
    }

});