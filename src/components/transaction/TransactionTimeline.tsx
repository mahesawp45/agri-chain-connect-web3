
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
  return (
    <Card className="earth-card-clay overflow-hidden">
      <CardHeader className="earth-header-clay pb-3">
        <CardTitle className="text-white">Transaction Timeline</CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="space-y-4">
          {history.map((event, index) => (
            <div key={index} className="flex">
              <div className="mr-4 flex flex-col items-center">
                <div className="w-4 h-4 bg-earth-brown rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-earth-clay rounded-full"></div>
                </div>
                {index < history.length - 1 && (
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
