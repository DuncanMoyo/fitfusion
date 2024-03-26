import { IFitnessEvent } from "@/mongodb/models/fitnessEvent.model";
import { Button } from "../ui/button";

const Order = ({event, userId}: {event: IFitnessEvent, userId: string}) => {

  const onOrder = async () => {
    console.log('ORDER');
    
  }

  return (
    <form action={onOrder} method="post">
      <Button size='lg' role="link" className="sm:w-fit rounded-full" type="submit">
        {event.isFree ? 'Get Ticket': 'Purchase Ticket'}
      </Button>
    </form>
  )
}

export default Order