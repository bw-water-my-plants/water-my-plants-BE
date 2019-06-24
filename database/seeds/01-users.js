exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { name: 'Tony Stark', email: 'tony@stark.com', phone_number: '+42190834521' },
                { name: 'Sansa Stark', email: 'sansa@stark.com', phone_number: '+42190834522' },
                { name: 'Bran Stark', email: 'bran@stark.com', phone_number: '+42190834523' },
                { name: 'John Snow', email: 'john@snow.com', phone_number: '+42190834524' },
                { name: 'Mayce Stark', email: 'mayce@stark.com', phone_number: '+42190834525' }
            ]);
        });
};
