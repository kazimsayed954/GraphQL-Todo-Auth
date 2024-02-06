var MyLib = {
    //Max id guaranted to be unique will be 999 999 999. 
    //Add more zeros to increase the value.
    lastUid : 100000000, 

    generateUid : function(){
        this.lastUid++;

        //Way to get a random int value betwen min and max: 
        //Math.floor(Math.random() * (max - min) ) + min;
        var randValue = Math.floor(Math.random() * (99999 - 10000)) + 10000;

        return Number(this.lastUid.toString() + randValue);
    }
};

export default MyLib;