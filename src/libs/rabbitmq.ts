import * as amqp from "amqplib";


export default new class MessageQueue{
    async MessageSend (queueName: String, playload: any) :
    Promise<Boolean> {
        try {
            const connection = await amqp.connect("amqp://localhost:5672");

            const channel = await connection.createChannel();

            await channel.assertQueue(queueName);
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(playload)))

            await channel.close()
            await connection.close()

            return null
        } catch (error) {
            return error
        }
    }
}