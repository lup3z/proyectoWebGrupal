const fs = require('fs');

const User = {
	fileName: './src/database/users.json',

	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},
    create:function (userData){

    }
}
console.log(User.getData());