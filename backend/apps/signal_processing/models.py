from django.db import models

class SignalSample(models.Model):
    device_id = models.CharField(max_length=128, blank=True, default='')
    timestamp = models.DateTimeField(auto_now_add=True)
    value = models.FloatField()
    meta = models.JSONField(blank=True, null=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.device_id} @ {self.timestamp}: {self.value}"