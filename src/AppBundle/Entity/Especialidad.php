<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Especialidad
 *
 * @ORM\Table(name="especialidad")
 * @ORM\Entity
 */
class Especialidad
{
    /**
     * @var integer
     *
     * @ORM\Column(name="spc_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $spcId;

    /**
     * @var string
     *
     * @ORM\Column(name="spc_name", type="text", nullable=false)
     */
    private $spcName;



    /**
     * Get spcId
     *
     * @return integer 
     */
    public function getSpcId()
    {
        return $this->spcId;
    }

    /**
     * Set spcName
     *
     * @param string $spcName
     * @return Especialidad
     */
    public function setSpcName($spcName)
    {
        $this->spcName = $spcName;

        return $this;
    }

    /**
     * Get spcName
     *
     * @return string 
     */
    public function getSpcName()
    {
        return $this->spcName;
    }
}
