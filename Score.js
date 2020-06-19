class Score
{
   constructor()
   {
       this.score = 0;
   }

   get getScore()
   {
       return this.score;
   }

   set setScore(score)
   {
       this.score += score;
   }
}