from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

class SignalListView(APIView):  # apps.signal_processing.views.SignalListView
    permission_classes = [AllowAny]

    def get(self, _request):
        return Response([
            {"id": 1, "name": "Test Signal", "sampling_rate": 1000, "status": "ok"},
        ])

class ProcessSignalView(APIView):  # apps.signal_processing.views.ProcessSignalView
    permission_classes = [IsAuthenticated]

    def post(self, request):
        payload = request.data
        return Response({"received": payload, "result": "processed"})