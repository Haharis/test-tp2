var UserRepository = require('../../../src/repository/UserRepository');


describe("UserRepository", function() {
    it("should call db.write", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);

        var repository = new UserRepository(mockDb);
        repository.create({
            id : 1,
            firstname: 'John',
            lastname : 'Doe',
            birthday : '2000-01-01'
        });

        expect(mockDb.push).toHaveBeenCalledWith({
            id : 1,
            firstname: 'John',
            lastname : 'Doe',
            birthday : '2000-01-01'
        });
        expect(mockDb.write).toHaveBeenCalledTimes(1);
    });

    it("should throw exception undefined", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.create();
        };

        expect(f).toThrow('User object is undefined')
    });

    it("should throw exception missing information", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.create({
                'id' : 1
            });
        };

        expect(f).toThrow('User object is missing information')
    });

});

describe("UserRepository FindOneById", function() {
    it("should call db.value", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write', 'find', 'value']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);

        var repository = new UserRepository(mockDb);

        repository.create({
            id : 2,
            firstname : 'Bruno',
            lastname : 'Benjamin Pierrot',
            birthday : '1995-09-24'
        });

        repository.findOneById(2);

        expect(mockDb.get).toHaveBeenCalledWith('users');
        expect(mockDb.get).toHaveBeenCalledTimes(2);

        expect(mockDb.push).toHaveBeenCalledWith({
            id : 2,
            firstname: 'Bruno',
            lastname : 'Benjamin Pierrot',
            birthday : '1995-09-24'
        });
        expect(mockDb.push).toHaveBeenCalledTimes(1);

        expect(mockDb.write).toHaveBeenCalledTimes(1);

        expect(mockDb.find).toHaveBeenCalledWith({id: 2});
        expect(mockDb.find).toHaveBeenCalledTimes(1);

        expect(mockDb.value).toHaveBeenCalledTimes(1);
    });

    it("should throw exception undefined", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.findOneById();
        };

        expect(f).toThrow('User ID is undefined');
    });
});

describe("UserRepository Update", function() {
    it("should call db.write", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write', 'find', 'assign']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);
        mockDb.assign.and.returnValue(mockDb);

        var repository = new UserRepository(mockDb);

        repository.create({
            id : 3,
            firstname: 'Oui',
            lastname : 'Non',
            birthday : '2005-06-07'
        });

        repository.update({
            id : 3,
            firstname : 'Bruno',
            lastname : 'Benjamin Pierrot',
            birthday : '1995-09-24'
        })

        expect(mockDb.get).toHaveBeenCalledWith('users');
        expect(mockDb.get).toHaveBeenCalledTimes(2);

        expect(mockDb.push).toHaveBeenCalledWith({
            id : 3,
            firstname: 'Oui',
            lastname : 'Non',
            birthday : '2005-06-07'
        });
        expect(mockDb.push).toHaveBeenCalledTimes(1);

        expect(mockDb.write).toHaveBeenCalledTimes(2);

        expect(mockDb.find).toHaveBeenCalledWith({id: 3});
        expect(mockDb.find).toHaveBeenCalledTimes(1);

        expect(mockDb.assign).toHaveBeenCalledWith({
            id : 3,
            firstname : 'Bruno',
            lastname : 'Benjamin Pierrot',
            birthday : '1995-09-24'
        });
        expect(mockDb.assign).toHaveBeenCalledTimes(1);
    });

    it("should throw exception undefined", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.update();
        };

        expect(f).toThrow('User object is undefined')
    });

    it("should throw exception missing information", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.update({});
        };

        expect(f).toThrow('User object is missing information')
    });
});

describe("UserRepository Delete", function() {
    it("should call db.write", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write', 'find', 'value', 'remove']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);
        mockDb.remove.and.returnValue(mockDb);

        var repository = new UserRepository(mockDb);

        repository.create({
            id : 4,
            firstname: 'Non',
            lastname : 'Oui',
            birthday : '2007-06-05'
        });

        repository.delete(4);

        expect(mockDb.get).toHaveBeenCalledWith('users');
        expect(mockDb.get).toHaveBeenCalledTimes(3);

        expect(mockDb.push).toHaveBeenCalledWith({
            id : 4,
            firstname: 'Non',
            lastname : 'Oui',
            birthday : '2007-06-05'
        });
        expect(mockDb.push).toHaveBeenCalledTimes(1);

        expect(mockDb.write).toHaveBeenCalledTimes(2);

        expect(mockDb.find).toHaveBeenCalledWith({id: 4});
        expect(mockDb.find).toHaveBeenCalledTimes(1);

        expect(mockDb.value).toHaveBeenCalledTimes(1);

        /*expect(mockDb.remove).toHaveBeenCalledWith({
            id : 4,
            firstname: 'Non',
            lastname : 'Oui',
            birthday : '2007-06-05'
        });*/
        expect(mockDb.remove).toHaveBeenCalledTimes(1);
    });

    it("should throw exception undefined", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.delete();
        };

        expect(f).toThrow('User ID is undefined')
    });
});