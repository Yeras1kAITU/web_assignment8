$(document).ready(function() {
    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // Add fade-in animation to elements with class 'fade-in'
    $('.fade-in').each(function(i) {
        $(this).delay(i * 200).animate({opacity: 1}, 800);
    });
    
    // Add slide-in animation to elements with class 'slide-in'
    $('.slide-in').each(function(i) {
        $(this).delay(i * 200).animate({opacity: 1, top: 0}, 800);
    });
    
    // Portfolio filter functionality
    $('.portfolio-filter').on('click', function() {
        $('.portfolio-filter').removeClass('active');
        $(this).addClass('active');
        
        const filter = $(this).data('filter');
        
        if (filter === 'all') {
            $('.portfolio-item').fadeIn(500);
        } else {
            $('.portfolio-item').each(function() {
                if ($(this).data('category') === filter) {
                    $(this).fadeIn(500);
                } else {
                    $(this).fadeOut(500);
                }
            });
        }
    });
    
    // Update task statistics
    function updateTaskStatistics() {
        const totalTasks = $('#taskList .task-item').length;
        const completedTasks = $('#taskList .task-completed').length;
        const pendingTasks = totalTasks - completedTasks;
        
        $('#totalTasks').text(totalTasks);
        $('#completedTasks').text(completedTasks);
        $('#pendingTasks').text(pendingTasks);
    }
    
    // Initialize task statistics
    updateTaskStatistics();
    
    // Planner functionality
    // Add new task - FIXED: Removed bg-light class
    $('#addTaskBtn').on('click', function() {
        const taskText = $('#newTask').val().trim();
        if (taskText) {
            const taskHtml = `
                <div class="task-item d-flex justify-content-between align-items-center p-3 rounded mb-2">
                    <div>
                        <input class="form-check-input me-2" type="checkbox">
                        <span>${taskText}</span>
                    </div>
                    <button class="btn btn-sm btn-outline-danger delete-task">Delete</button>
                </div>
            `;
            $('#taskList').append(taskHtml);
            $('#newTask').val('');
            
            // Update statistics
            updateTaskStatistics();
            
            // Show success message
            showNotification('Task added successfully!', 'success');
        } else {
            showNotification('Please enter a task!', 'error');
        }
    });
    
    // Mark task as completed
    $(document).on('change', '.form-check-input', function() {
        const taskItem = $(this).closest('.task-item');
        if ($(this).is(':checked')) {
            taskItem.addClass('task-completed');
            taskItem.find('span').css('text-decoration', 'line-through');
        } else {
            taskItem.removeClass('task-completed');
            taskItem.find('span').css('text-decoration', 'none');
        }
        
        // Update statistics
        updateTaskStatistics();
    });
    
    // Delete task
    $(document).on('click', '.delete-task', function() {
        $(this).closest('.task-item').fadeOut(300, function() {
            $(this).remove();
            // Update statistics
            updateTaskStatistics();
            showNotification('Task deleted!', 'info');
        });
    });
    
    // Contact form validation
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const message = $('#message').val().trim();
        let isValid = true;
        
        // Reset previous error states
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').remove();
        
        // Validate name
        if (name === '') {
            $('#name').addClass('is-invalid');
            $('#name').after('<div class="invalid-feedback">Please enter your name.</div>');
            isValid = false;
        }
        
        // Validate email
        if (email === '') {
            $('#email').addClass('is-invalid');
            $('#email').after('<div class="invalid-feedback">Please enter your email.</div>');
            isValid = false;
        } else if (!isValidEmail(email)) {
            $('#email').addClass('is-invalid');
            $('#email').after('<div class="invalid-feedback">Please enter a valid email address.</div>');
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            $('#message').addClass('is-invalid');
            $('#message').after('<div class="invalid-feedback">Please enter your message.</div>');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            $('#contactForm').fadeOut(300, function() {
                $('#contactForm').after(`
                    <div class="alert alert-success text-center">
                        <h4>Thank you for your message!</h4>
                        <p>We'll get back to you soon.</p>
                    </div>
                `);
                showNotification('Message sent successfully!', 'success');
            });
        }
    });
    
    // Helper function to validate email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Notification function
    function showNotification(message, type) {
        const alertClass = type === 'success' ? 'alert-success' : 
                          type === 'error' ? 'alert-danger' : 'alert-info';
        
        const notification = $(`
            <div class="alert ${alertClass} alert-dismissible fade show position-fixed" 
                 style="top: 20px; right: 20px; z-index: 1050; min-width: 300px;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);
        
        $('body').append(notification);
        
        // Auto remove after 5 seconds
        setTimeout(function() {
            notification.alert('close');
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this).attr('href');
        if (target && $(target).length) {
            $('html, body').stop().animate({
                scrollTop: $(target).offset().top - 70
            }, 1000);
        }
    });
    
    // Modal for portfolio items
    $('.portfolio-item').on('click', function() {
        const title = $(this).find('.card-title').text();
        const description = $(this).find('.card-text').text();
        const imageSrc = $(this).find('img').attr('src');
        
        $('#portfolioModalLabel').text(title);
        $('#portfolioModalImage').attr('src', imageSrc);
        $('#portfolioModalDescription').text(description);
        
        $('#portfolioModal').modal('show');
    });
});