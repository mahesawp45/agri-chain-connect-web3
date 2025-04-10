
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface TimelineEvent {
  date: Date;
  status: string;
  description: string;
}

interface TransactionTimelineProps {
  history: TimelineEvent[];
}

export const TransactionTimeline = ({ history }: TransactionTimelineProps) => {
  // Ensure we have a valid history array to work with
  const timelineEvents = Array.isArray(history) && history.length > 0 
    ? history 
    : [];
  
  if (timelineEvents.length === 0) {
    return (
      <Card className="earth-card-clay overflow-hidden">
        <CardHeader className="earth-header-clay pb-3">
          <CardTitle className="text-white">Transaction Timeline</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <div className="text-center py-4">
            <p className="text-earth-brown">No timeline events available.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="earth-card-clay overflow-hidden">
      <CardHeader className="earth-header-clay pb-3">
        <CardTitle className="text-white">Transaction Timeline</CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <div key={index} className="flex">
              <div className="mr-4 flex flex-col items-center">
                <div className="w-4 h-4 bg-earth-brown rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-earth-clay rounded-full"></div>
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className="w-0.5 bg-earth-light-brown h-full mt-1"></div>
                )}
              </div>
              <div className="pb-4">
                <div className="flex flex-col">
                  <p className="font-medium text-earth-dark-green">{event.description}</p>
                  <p className="text-sm text-earth-brown">{formatDate(event.date)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTimeline;
