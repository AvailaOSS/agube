import asyncio
from aio_pika import connect, ExchangeType
from aio_pika.abc import AbstractIncomingMessage
from asgiref.sync import sync_to_async
import traceback

class MqConsumer():

    def __init__(self, broker_url: str, exchange_name: str):
        self.broker_url = broker_url
        self.exchange_name = exchange_name

    async def __start_consuming(self, callback, queue_name: str,
                                binding_keys: str) -> None:
        # Perform connection
        connection = await connect(self.broker_url)

        async with connection:
            # Creating a channel
            channel = await connection.channel()
            await channel.set_qos(prefetch_count=1)

            exchange = await channel.declare_exchange(
                self.exchange_name,
                ExchangeType.TOPIC,
            )

            # Declaring queue
            queue = await channel.declare_queue(queue_name)

            # Binding
            for binding_key in binding_keys:
                await queue.bind(exchange, routing_key=binding_key)

            print(" [*] Waiting for messages. To exit press CTRL+C")

            # Start listening the queue
            async with queue.iterator() as iterator:
                message: AbstractIncomingMessage
                async for message in iterator:
                    await on_message(message, callback)

    def start_consuming(self,
                        callback,
                        queue_name: str = None,
                        binding_keys: str = None):
        try:
            asyncio.run(
                self.__start_consuming(callback, queue_name, binding_keys))
        except KeyboardInterrupt:
            print(" [!] Stop. Keyboard interruption.")


async def on_message(message: AbstractIncomingMessage, callback) -> None:
    async with message.process():
        try:
            await sync_to_async(callback)(message.routing_key, message.body)
        except Exception:
            traceback.print_exc()
