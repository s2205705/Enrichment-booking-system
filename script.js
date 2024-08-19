=<script>
    $(document).ready(function() {
        // Sample events array
        var events = [
            {
                title: 'Sample Event',
                start: '2024-07-24T10:00:00',
                end: '2024-07-24T12:00:00',
                description: 'Sample Description'
            }
            // Add more sample events here if needed
        ];

        $('#calendar').fullCalendar({
            events: events
        });

        $('#schedule-form').submit(function(event) {
            event.preventDefault();
            var title = $('#activity-title').val();
            var description = $('#activity-description').val();
            var date = $('#activity-date').val();
            var time = $('#activity-time').val();
            var location = $('#activity-location').val();
            var datetime = date + 'T' + time;

            var newEvent = {
                title: title,
                start: datetime,
                description: description
            };

            events.push(newEvent);
            $('#calendar').fullCalendar('renderEvent', newEvent, true);

            // Clear form fields
            $('#schedule-form')[0].reset();
        });

        $('#assign-form').submit(function(event) {
            event.preventDefault();
            var activityTitle = $('#assign-activity').val();
            var emails = $('#student-emails').val().split(',').map(email => email.trim());
            var activities = document.querySelectorAll('.activity');

            activities.forEach(function(activity) {
                if (activity.querySelector('h3').textContent === activityTitle) {
                    emails.forEach(email => {
                        activity.querySelector('.sign-up-btn').dataset.assigned = email;
                    });
                }
            });

            // Clear form fields
            $('#assign-form')[0].reset();
        });

        $('#login-form').submit(function(event) {
            event.preventDefault();
            var email = $('#email').val().trim();

            // Updated regex for student and teacher email format
            var studentRegex = /^s\d{7}@students\.southwark\.ac\.uk$/i;
            var teacherRegex = /^[^sS].*@southwark\.ac\.uk$/i;

            if (studentRegex.test(email)) {
                alert('Student logged in');
                $('#schedule_activity').hide();
                $('#admin_assign').hide();
                showStudentActivities(email);
            } else if (teacherRegex.test(email)) {
                alert('Teacher/Admin logged in');
                $('#schedule_activity').show();
                $('#admin_assign').show();
                loadAdminAssignedActivities();
            } else {
                alert('Invalid email address');
            }
        });

        function showStudentActivities(email) {
            $('.activity').each(function() {
                var button = $(this).find('.sign-up-btn');
                if (!button.data('assigned') || button.data('assigned') === email) {
                    button.show();
                } else {
                    button.hide();
                }
            });
        }

        function loadAdminAssignedActivities() {
            $('.activity .sign-up-btn').hide();
        }

        $('.sign-up-btn').click(function() {
            var title = $(this).data('title');
            var description = $(this).data('description');
            var date = $(this).data('date');
            var time = $(this).data('time');
            var location = $(this).data('location');
            var email = $('#email').val();

            if (!email) {
                alert('Please log in to sign up for activities.');
                return;
            }

            alert('Signed up for activity: ' + title);
            $(this).hide(); // Hide the button after sign-up
        });
    });
</script>
