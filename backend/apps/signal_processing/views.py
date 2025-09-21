from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import SignalSample
from.serializers import SignalSampleSerializer

class SignalListView(APIView):  
    permission_classes = [AllowAny]

    def get(self, request):
        limit = int(request.query_params.get('limit', 200))
        samples = SignalSample.objects.all().order_by('-timestamp')[:limit]
        serializer = SignalSampleSerializer(samples, many=True)
        data = list(reversed(serializer.data))
        return Response(data)

class ProcessSignalView(APIView):  
    permission_classes = [IsAuthenticated]

    def post(self, request):
        payload = request.data
       # implement server-side processing ->
        return Response({"received": payload, "result": "processed"})
