import time
import socket
from django.core.management.base import BaseCommand
from apps.signal_processing.models import SignalSample

class UDPAdapter:
    def __init__(self, port=5005, bind='0.0.0.0'):
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.sock.bind((bind, port))
        self.sock.settimeout(1.0)

    def read(self):
        try:
            data, addr = self.sock.recvfrom(4096)
            text = data.decode().strip()
            return {'value': float(text), 'device_id': addr[0]}
        except socket.timeout:
            return None
        except Exception:
            return None

class Command(BaseCommand):
    help = "Collect signals from a device (UDP adapter demo)."

    def add_arguments(self, parser):
        parser.add_argument('--adapter', default='udp', choices=['udp'], help='Adapter to use')
        parser.add_argument('--port', type=int, default=5005)

    def handle(self, *args, **options):
        adapter_name = options['adapter']
        if adapter_name == 'udp':
            adapter = UDPAdapter(port=options['port'])
            self.stdout.write(f"Listening UDP on port {options['port']}")
        else:
            self.stdout.write("Unknown adapter")
            return

        try:
            while True:
                pkt = adapter.read()
                if pkt:
                    SignalSample.objects.create(device_id=pkt.get('device_id', ''), value=pkt['value'], meta={})
                    self.stdout.write(f"Saved sample {pkt}")
                time.sleep(0.05)
        except KeyboardInterrupt:
            self.stdout.write("Collector stopped")