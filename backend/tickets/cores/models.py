from django.db import models


class Ticket(models.Model):
    IssueCategoryChoices = [
        ('Payment', 'Payment'),
        ('Technical', 'Technical'),
        ('General', 'General')
    ]
    IssueStatusChoices = [
        ('Open', 'Open'),
        ('In Progress', 'In Progress'),
        ('Resolved', 'Resolved')
    ]

    title = models.CharField(max_length=100, blank=True, default='')
    customer_name = models.CharField(max_length=100)
    customer_phone = models.CharField(max_length=15, null=True, blank=True)
    customer_email = models.EmailField()
    issue_category = models.CharField(max_length=15, choices=IssueCategoryChoices)
    issue_description = models.TextField()
    status = models.CharField(max_length=15, choices=IssueStatusChoices, default='Open')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.title
