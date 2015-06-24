<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerInterface;

class SQLFixtures extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        // Bundle to manage file and directories
        $finder = new Finder();
        $finder->in('web/sql');
        $finder->name('categories.sql');

        foreach ($finder as $file) {
            $content = $file->getContents();

            $stmt = $this->container->get('doctrine.orm.entity_manager')->getConnection()->prepare($content);
            $stmt->execute();

            /*$manager->getConnection()->exec($content);  // Execute native SQL
            $manager->flush();*/
        }
    }

    public function getOrder()
    {
        return 99;  // Order in which this fixture will be executed
    }

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }
}
