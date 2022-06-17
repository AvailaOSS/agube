import asyncio
from aio_pika import connect, Message, ExchangeType, DeliveryMode


class MqPublisher():

    def __init__(self, broker_url: str, exchange_name: str):
        self.broker_url = broker_url
        self.exchange_name = exchange_name

    async def __publish(self, routing_key: str, message_body: bytes,
                        content_type: str) -> None:
        # Perform connection
        connection = await connect(self.broker_url)

        async with connection:
            # Creating a channel
            channel = await connection.channel()

            exchange = await channel.declare_exchange(self.exchange_name,
                                                      ExchangeType.TOPIC)

            # Sending the message
            await exchange.publish(
                Message(
                    message_body,
                    content_type=content_type,
                    # delivery_mode=DeliveryMode.NOT_PERSISTENT
                ),
                # routing_key=queue.name,
                routing_key=routing_key)

    def publish(self,
                routing_key: str,
                message_body: bytes,
                content_type: str = "application/json"):
        asyncio.run(self.__publish(routing_key, message_body, content_type))
