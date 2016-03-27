import Character from '../models/character';


class CharactersDAO {
    
    getRandomCharacters(count,gender){
        return Character.find({ random: { $near: [Math.random(), 0] } })
               .where('voted', false)
               .where('gender', gender)
               .limit(count)
               .execAsync();
    }
    
    getCharacterCount(conditions){
        return Character.find(conditions || {}).countAsync({});
    }
    
    getCharacterByName(name){
        return Character.findOneAsync({ name: name });
    }
    
    getCharacterById(id){
        return Character.findOneAsync({ characterId: id });
    }
    
    getShameCharacters(limit){
        return Character
               .find()
               .sort('-losses')
               .skip(limit.start)
               .limit(limit.count)
               .execAsync();
    }
    
    getTopCharacters(conditions,limit){
       return Character
              .find(conditions)
              .sort('-wins')
              .skip(limit.start)
              .limit(limit.count)
              .execAsync();
    }
    
    getTop100Races(){
       return Character
              .find()
              .sort('-wins')
              .limit(100)
              .select('race')
              .execAsync();
    }
    
    getTop100Bloodline(){
        return Character
               .find()
               .sort('-wins')
               .limit(100)
               .select('bloodline')
               .execAsync();
    }
    
    getTotalVotes(){
        return Character.aggregateAsync({ $group: { _id: null, total: { $sum: '$wins' } } }).then(totalVotes => {
           return totalVotes.length ? totalVotes[0].total : 0;
        })
    }
    
    resetRound(){
        return Character.updateAsync({}, { $set: { voted: false } }, { multi: true });
    }
    
    save(data){
        return new Character(data).saveAsync();
        
    }
    
};

export default new CharactersDAO();