//variables
var player, playerImg;
var backgroundImg;
var edges,enemy1,enemy2,enemy3,enemy4,enemy5,enemy6,enemy7,enemy8,enemy9,enemy10,enemyImg,enemyArray=[];
var playerBullet1Img,playerBullet2Img;
var bossBulletImg,bossArray = [];
var score = 0; 

//preload function
function preload()
{
//loading the images
    playerImg = loadImage('spacecraft.png');
    backgroundImg = loadImage('background.jpg'); 
    playerBullet1Img = loadImage('Bullet1.png');
    playerBullet2Img = loadImage('Bullet2.png');
//  enemyBulletImg = loadImage('EnemyBullet.png');
    bossBulletImg= loadImage('BossBullet.png');
    enemyImg = loadImage('Enemy.png');
    bossImg = loadImage('Boss.png');
}

//setup function
function setup()
{
    //creating the canvas
    var canvas =  createCanvas(1600,1200);
    var x = (windowWidth - width)/2;
    var y = 1200;
    canvas.position(x,y);
  
    //player sprite
    player = createSprite(450,1150);
    player.addImage(playerImg);
    player.scale = 0.18;    

    //groups for the bullet
    bullet1Group = new Group();
    bullet2Group = new Group();

    //group for the bosses
    bossGroup = new Group();

//enemies
    enemy1 = createSprite(canvas.width/2-250,450,30,30);
    enemy1.addImage(enemyImg);
    enemy1.scale = 0.1;
    enemy1.velocityY=2;
    //console.log(canvas.width/2);

    enemy2 = createSprite(canvas.width/2-200,450,30,30);
    enemy2.addImage(enemyImg);
    enemy2.scale = 0.1;
    enemy2.velocityY=2;

    enemy3 = createSprite(canvas.width/2-150,450,30,30);
    enemy3.addImage(enemyImg);
    enemy3.scale = 0.1;
    enemy3.velocityY=2;

    enemy4= createSprite(canvas.width/2-100,450,30,30);
    enemy4.addImage(enemyImg);
    enemy4.scale = 0.1;
    enemy4.velocityY=2;

    enemy5= createSprite(canvas.width/2-50,450,30,30);
    enemy5.addImage(enemyImg);
    enemy5.scale = 0.1;
    enemy5.velocityY=2;

    enemy6 = createSprite(canvas.width/2,450,30,30);
    enemy6.addImage(enemyImg);
    enemy6.scale = 0.1;
    enemy6.velocityY=2;

    enemy7 = createSprite(canvas.width/2+50,450,30,30);
    enemy7.addImage(enemyImg);
    enemy7.scale = 0.1;
    enemy7.velocityY=2;

    enemy8 = createSprite(canvas.width/2+100,450,30,30);
    enemy8.addImage(enemyImg);
    enemy8.scale = 0.1;
    enemy8.velocityY=2;

    enemy9= createSprite(canvas.width/2+150,450,30,30);
    enemy9.addImage(enemyImg);
    enemy9.scale = 0.1;
    enemy9.velocityY=2;

    enemy10= createSprite(canvas.width/2+200,450,30,30);
    enemy10.addImage(enemyImg);
    enemy10.scale = 0.1;
    enemy10.velocityY=2;

    enemy11= createSprite(canvas.width/2+250,450,30,30);
    enemy11.addImage(enemyImg);
    enemy11.scale = 0.1;
    enemy11.velocityY=2;

    //enemy array
    enemyArray.push(enemy1);
    enemyArray.push(enemy2);
    enemyArray.push(enemy3);
    enemyArray.push(enemy4);
    enemyArray.push(enemy5);
    enemyArray.push(enemy6);
    enemyArray.push(enemy7);
    enemyArray.push(enemy8);
    enemyArray.push(enemy9);
    enemyArray.push(enemy10);
    enemyArray.push(enemy11);

    //creating edge boundaries
    edges =  createEdgeSprites();
}

function draw()
{
    //background image
    background(backgroundImg);

  //  console.log(windowWidth);
    
  //make the player stop moving if no movement key is pressed
    player.velocityX = 0;
    player.velocityY = 0;

    //moving the player
    if(keyDown(UP_ARROW))
    {
        player.velocityY = -5;
    }

    if(keyDown(DOWN_ARROW))
    {
        player.velocityY = 5;
    }

    if(keyDown(LEFT_ARROW))
    {
        player.velocityX = -5;
    }

    if(keyDown(RIGHT_ARROW))
    {
        player.velocityX = 5;
    }

    //make the player remain within the canvas
    player.collide(edges);

    //fire player bullet 1
    if(keyDown("space"))
    {
     firePB1();
    }

    //fire player bullet 2
    if(keyDown("b"))
    {
     firePB2();
    }
   
    //stop the enemies if they go out of the canvas
    for(var i=0;i<enemyArray.length;i++)
    {
      if(enemyArray[i].y === 500)
        {
            enemyArray[i].velocityY=0;          
        }
    }
    
    //spawn enemies
    spawnEnemy();

    //spawn second wave of enemies
    if(score>25)
    {
        spawnEnemy();
    }

//destroy the enemies if they get shot by bullets
  for(var i = 0; i<enemyArray.length; i++)
{
    if(bullet1Group.isTouching(enemyArray[i]))
    {
       enemyArray[i].destroy();
       score = score + 3;
    }

    if(bullet2Group.isTouching(enemyArray[i]))
    {
        enemyArray[i].destroy();
        score = score + 3;
    }
}

    for(var i = 0; i<enemyArray.length; i++)
    {
        if(enemyArray[i].isTouching(player))
        {
            player.destroy();
        }
    }

    //level 2 - spawning BOSSES
    if(score>=40 && frameCount % 60 === 0)
    {
        spawnBoss();
    }

    bossFiring();

    //destroy the bosses if and only if they get shot by bullet 2
    for(var i = 0; i<bossArray.length; i++)
    {
        if(bullet2Group.isTouching(bossArray[i]))
        {
            bossArray[i].destroy();
            score = score + 5;
        }
    }    


    //console.log(backgroundImg.height);
    
    //draw sprite objects on the screen
    drawSprites();

   //text to display score
    fill("red");
    textSize(18);
    text("Score: "+score,1480,1150);

}    
   
//spawning the enemies
function spawnEnemy()
{
    if(frameCount % 50 === 0)
    {
       /* var enemy = new Enemy(400,50);
        enemy.display();
        enemy.lifetime = 60;*/

        /*var canvas =  createCanvas(800,1200);
        var x = (windowWidth - width)/2;
        var y = 1200;
        canvas.position(x,y);*/

        rn = Math.round(random(1,11));
            switch(rn)
            {
                case 1: if(player.x > enemy1.x)
                {
                            enemy1.rotation = -15;
                            enemy1.velocityX=2;
                            enemy1.velocityY=3;
                }
                        else
                {
                            enemy1.rotation = -35;
                            enemy1.velocityX= -2;
                            enemy1.velocityY=3;
                }
                        break;

                        
                case 2: if(player.x > enemy2.x)
                {
                    enemy2.rotation = -15;
                    enemy2.velocityX=2;
                    enemy2.velocityY=3;
                }
                else
                {
                    enemy2.rotation = -35;
                    enemy2.velocityX=-2;
                    enemy2.velocityY=3;
                }
                        break;

                        
                case 3: if(player.x > enemy3.x)
                {
                    enemy3.rotation = -15;
                    enemy3.velocityX=2;
                    enemy3.velocityY=3;
                }
                else
                {
                    enemy3.rotation = -35;
                    enemy3.velocityX=-2;
                    enemy3.velocityY=3;
                }
                        break;


                case 4: if(player.x > enemy4.x)
                {
                    enemy4.rotation = -15;
                    enemy4.velocityX=2;
                    enemy4.velocityY=3;
                }
                else
                {
                    enemy4.rotation = -35;
                    enemy4.velocityX=-2;
                    enemy4.velocityY=3;
                }
                        break;


                case 5: if(player.x > enemy5.x)
                {
                    enemy5.rotation = -15;
                    enemy5.velocityX=2;
                    enemy5.velocityY=3;
                }
                else
                {
                    enemy5.rotation = -35;
                    enemy5.velocityX=-2;
                    enemy5.velocityY=3;
                }
                        break;


                case 6: if(player.x > enemy6.x)
                {
                    enemy6.rotation = -15;
                    enemy6.velocityX=2;
                    enemy6.velocityY=3;
                }
                else
                {
                    enemy6.rotation = -35;
                    enemy6.velocityX=-2;
                    enemy6.velocityY=3;
                }
                        break;


                case 7: if(player.x > enemy7.x)
                {
                    enemy7.rotation = -15;
                    enemy7.velocityX=2;
                    enemy7.velocityY=3;
                }
                else
                {
                    enemy7.rotation = -35;
                    enemy7.velocityX=-2;
                    enemy7.velocityY=3;
                }
                        break;


                case 8: if(player.x > enemy8.x)
                {
                    enemy8.rotation = -15;
                    enemy8.velocityX=2;
                    enemy8.velocityY=3;
                }
                else
                {
                    enemy8.rotation = -35;
                    enemy8.velocityX=-2;
                    enemy8.velocityY=3;
                }
                        break;


                case 9: if(player.x > enemy9.x)
                {
                    enemy9.rotation = -15;
                    enemy9.velocityX=2;
                    enemy9.velocityY=3;
                }
                else
                {
                    enemy9.rotation = -35;
                    enemy9.velocityX=-2;
                    enemy9.velocityY=3;
                }
                        break;


                case 10: if(player.x > enemy10.x)
                {
                    enemy10.rotation = -15;
                    enemy10.velocityX=2;
                    enemy10.velocityY=3;
                }
                else
                {
                    enemy10.rotation = -35;
                    enemy10.velocityX=-2;
                    enemy10.velocityY=3;
                }
                        break;

                        
                case 11: if(player.x > enemy11.x)
                {
                    enemy11.rotation = -15;
                    enemy11.velocityX=2;
                    enemy11.velocityY=3;
                }
                else
                {
                    enemy11.rotation = -35;
                    enemy11.velocityX=-2;
                    enemy11.velocityY=3;
                }
                        break;
            }
    }
}

/*spawn the bosses if a particular score is reached
function spawnBoss()
{
//spawn boss
    boss1 = createSprite(canvas.width/2-250,450,30,30);
    boss1.addImage(bossImg);
    boss1.scale = 0.1;
   // boss1.velocityY=2;
    //console.log(canvas.width/2);

    boss2 = createSprite(canvas.width/2-200,450,30,30);
    boss2.addImage(bossImg);
    boss2.scale = 0.1;
    //boss2.velocityY=2;

    boss3 = createSprite(canvas.width/2-150,450,30,30);
    boss3.addImage(bossImg);
    boss3.scale = 0.1;
    //boss3.velocityY=2;

    boss4= createSprite(canvas.width/2-100,450,30,30);
    boss4.addImage(bossImg);
    boss4.scale = 0.1;
    //boss4.velocityY=2;

    boss5= createSprite(canvas.width/2-50,450,30,30);
    boss5.addImage(bossImg);
    boss5.scale = 0.1;
    //boss5.velocityY=2;

    boss6 = createSprite(canvas.width/2,450,30,30);
    boss6.addImage(bossImg);
    boss6.scale = 0.1;
    //boss6.velocityY=2;

    boss7 = createSprite(canvas.width/2+50,450,30,30);
    boss7.addImage(bossImg);
    boss7.scale = 0.1;
    //boss7.velocityY=2;

    boss8 = createSprite(canvas.width/2+100,450,30,30);
    boss8.addImage(bossImg);
    boss8.scale = 0.1;
    //boss8.velocityY=2;

    boss9= createSprite(canvas.width/2+150,450,30,30);
    boss9.addImage(bossImg);
    boss9.scale = 0.1;
    //boss9.velocityY=2;

    boss10= createSprite(canvas.width/2+200,450,30,30);
    boss10.addImage(bossImg);
    boss10.scale = 0.1;
    //boss10.velocityY=2;

    bossArray.push(boss1);
    bossArray.push(boss2);
    bossArray.push(boss3);
    bossArray.push(boss4);
    bossArray.push(boss5);
    bossArray.push(boss6);
    bossArray.push(boss7);
    bossArray.push(boss8);
    bossArray.push(boss9);
    bossArray.push(boss10);

}*/



//player bullet 1 firing
function firePB1()
{
//fire bullet 1 on space pressed
var bullet1 = createSprite(200,300,20,20);
bullet1.x = player.x;
bullet1.y = player.y - 50;
bullet1.velocityY = -10;
//bullet1.shapeColor = "yellow";
bullet1.addImage(playerBullet1Img);
bullet1.scale=0.05;

bullet1Group.add(bullet1);
}

//player bullet 2 firing
function firePB2()
{
//fire bullet 2 on B pressed
var bullet2 = createSprite(200,300,20,20);
bullet2.x = player.x;
bullet2.y = player.y - 50;
bullet2.velocityY = -6;
//bullet2.shapeColor = "green";
bullet2.addImage(playerBullet2Img);
bullet2.scale=2;

bullet2Group.add(bullet2);
}

function bossFiring()
{
//boss firing
if(player.x > boss1.x)
{
    var 
}

}