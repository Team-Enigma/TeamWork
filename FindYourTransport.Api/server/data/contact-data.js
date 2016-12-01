module.exports = (models) => {

    let { Message } = models;

    function getAllMessages() {
        return new Promise((resolve, reject) => {
            Message.find((err, messages) => {
                if (err) {
                    return reject(err);
                }

                return resolve(messages);
            });
        });
    }

    function getSpecificMessage(id) {
        return new Promise((resolve, reject) => {
            Message.findOne({ _id: id }, (err, message) => {
                if (err) {
                    return reject(err);
                }

                return resolve(message || null);
            });
        });
    }

    function updateMessageStatus(message) {
        Message.update({ _id: message._id }, { processedBy: message.processedBy, status: message.status }, null, (err) => {
            if (err) {
                return err;
            }

            return;
        });
    }

    function sendMessage(body) {
        return new Promise((resolve, reject) => {
            Message.create({
                name: body.name,
                address: body.address,
                title: body.title,
                content: body.content
            })
                .then(() => {
                    return resolve();
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    return {
        sendMessage,
        getAllMessages,
        getSpecificMessage,
        updateMessageStatus
    };
};