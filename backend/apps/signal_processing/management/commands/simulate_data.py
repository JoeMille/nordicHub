import time
import random
import math
from django.core.management.base import BaseCommand
from apps.signal_processing.models import SignalSample

class NRF52840Simulator:
    
    def __init__(self, device_id="nrf52840-sim"):
        self.device_id = device_id
        self.time_offset = 0
        self.base_temp = 23.5  
        self.base_accel = 1.0  
        self.battery_level = 95.0  
        
    def generate_temperature(self):
        # drift + random noise + daily cycle
        drift = math.sin(self.time_offset * 0.001) * 2.0
        noise = random.gauss(0, 0.3)
        daily_cycle = math.sin(self.time_offset * 0.0001) * 1.5
        return self.base_temp + drift + noise + daily_cycle
    
    def generate_accelerometer(self):
        if random.random() < 0.1:  
            return random.uniform(0.5, 4.0) 
        else:
            return random.gauss(self.base_accel, 0.1)  # At rest
    
    def generate_battery(self):
        self.battery_level -= random.uniform(0, 0.001)
        return max(0, self.battery_level)
    
    def generate_rssi(self):
        return random.randint(-85, -45)  
    
    def get_sample(self, sensor_type="temperature"):
        """Get a sample based on sensor type"""
        self.time_offset += 1
        
        if sensor_type == "temperature":
            return {
                'value': round(self.generate_temperature(), 2),
                'meta': {'sensor': 'temperature', 'unit': 'celsius'}
            }
        elif sensor_type == "accelerometer":
            return {
                'value': round(self.generate_accelerometer(), 3),
                'meta': {'sensor': 'accelerometer', 'unit': 'g'}
            }
        elif sensor_type == "battery":
            return {
                'value': round(self.generate_battery(), 1),
                'meta': {'sensor': 'battery', 'unit': 'percent'}
            }
        elif sensor_type == "rssi":
            return {
                'value': self.generate_rssi(),
                'meta': {'sensor': 'rssi', 'unit': 'dBm'}
            }

class Command(BaseCommand):
    help = "Simulate nRF52840 sensor data for development"

    def add_arguments(self, parser):
        parser.add_argument('--sensor', default='temperature', 
                          choices=['temperature', 'accelerometer', 'battery', 'rssi'],
                          help='Type of sensor to simulate')
        parser.add_argument('--device-id', default='nrf52840-sim', 
                          help='Device identifier')
        parser.add_argument('--interval', type=float, default=1.0,
                          help='Sampling interval in seconds')
        parser.add_argument('--count', type=int, default=0,
                          help='Number of samples (0 = infinite)')

    def handle(self, *args, **options):
        simulator = NRF52840Simulator(device_id=options['device_id'])
        sensor_type = options['sensor']
        interval = options['interval']
        count = options['count']
        
        self.stdout.write(
            f"Starting {sensor_type} simulation for {options['device_id']} "
            f"(interval: {interval}s, count: {count or 'infinite'})"
        )

        sample_count = 0
        try:
            while True:
                sample_data = simulator.get_sample(sensor_type)
                
                SignalSample.objects.create(
                    device_id=options['device_id'],
                    value=sample_data['value'],
                    meta=sample_data['meta']
                )
                
                sample_count += 1
                self.stdout.write(
                    f"Sample {sample_count}: {sample_data['value']} "
                    f"{sample_data['meta'].get('unit', '')}"
                )
                
                if count > 0 and sample_count >= count:
                    break
                    
                time.sleep(interval)
                
        except KeyboardInterrupt:
            self.stdout.write(f"\nSimulator stopped after {sample_count} samples")