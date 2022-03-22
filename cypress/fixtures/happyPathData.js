let randomText = '';
let randomNumb = '';
let testEmail = '';
let testPhone = '';
let randomPass = '';
let pattern = 'abcdefghijklmnopqrstuvwxyz';
let numbers = '1234567890';

for (let i = 0; i < 8; i++)
    randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));

for (let i = 0; i < 8; i++)
    randomNumb += numbers.charAt(Math.floor(Math.random() * numbers.length));
testEmail = randomText + '@gmail.com';
testPhone = '+54911' + randomNumb;
randomPass = 'A' + randomText + '1!';


//Correct Register dummie object
let form = {
    'idPlatform': 2,
    'idStatus': 2,
    'person': {
        'idType': 2,
        'attributes': [
            {
                'description': 'first_name',
                'value': 'Prueba'
            }, {
                'description': 'last_name',
                'value': 'Prueba'
            }, {
                'description': 'born_date',
                'value': '1993-01-20'
            }, {
                'description': 'gender',
                'value': 'm'
            }
        ],
        'emails': [
            {
                'idType': 1,
                'email': testEmail
            }
        ],
        'devices': [
            {
                'idPlatform': 1,
                'type': {
                    'description': 'motorola e5 play',
                    'resolution_width': 720,
                    'resolution_height': 1280
                },
                'hash': 'ME5P'
            }
        ],
        'telephones': [
            {
                'idType': 1,
                'country': 'AR',
                'telephone': testPhone
            }
        ],
        'documents': [
            {
                'idType': 1,
                'document': randomNumb
            }
        ],
        'addresses': [
            {
                'idType': 2,
                'metadata': {
                    'department': 'D',
                    'floor': '1'
                },
                'description': 'TUCUMAN 1667, CABA'
            }
        ]
    },
    'idGroup': 100,
    'platformName': 'SSameghini Productor',
    'password': 'Steplix123!',
    'payload': {
        'token': false
    },
    'ignoreCaptcha': true
};

let forms = {
    'idPlatform': 2,
    'payload': {
        'email': testEmail,
        'password': randomPass
    },
    'ignoreCaptcha': true
};

let formSingle = {
    'idPlatform': 2,
    'idStatus': 6,
    'person': {
        'idType': 1,
        'emails': [
            {
                'idType': 1,
                'email': testEmail
            }
        ]
    },
    'idGroup': 100,
    'password': randomPass,
    'payload': {
        'token': false
    },
    'ignoreCaptcha': true
};


const forgot = {
    'idPlatform': 2,
    'idForgotType': 2,
    'email': 'pcabezas@steplix.com'
};
export { form, forms, forgot, randomPass, formSingle };

