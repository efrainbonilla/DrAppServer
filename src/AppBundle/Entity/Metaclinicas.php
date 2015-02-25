<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Metaclinicas
 *
 * @ORM\Table(name="metaclinicas", indexes={@ORM\Index(name="mclin_md_id", columns={"mclin_md_id"}), @ORM\Index(name="mclin_clin_id", columns={"mclin_clin_id"})})
 * @ORM\Entity
 */
class Metaclinicas
{
    /**
     * @var integer
     *
     * @ORM\Column(name="mclin_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $mclinId;

    /**
     * @var \Medicos
     *
     * @ORM\ManyToOne(targetEntity="Medicos")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="mclin_md_id", referencedColumnName="md_id")
     * })
     */
    private $mclinMd;

    /**
     * @var \Clinicas
     *
     * @ORM\ManyToOne(targetEntity="Clinicas")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="mclin_clin_id", referencedColumnName="clin_id")
     * })
     */
    private $mclinClin;



    /**
     * Get mclinId
     *
     * @return integer 
     */
    public function getMclinId()
    {
        return $this->mclinId;
    }

    /**
     * Set mclinMd
     *
     * @param \AppBundle\Entity\Medicos $mclinMd
     * @return Metaclinicas
     */
    public function setMclinMd(\AppBundle\Entity\Medicos $mclinMd = null)
    {
        $this->mclinMd = $mclinMd;

        return $this;
    }

    /**
     * Get mclinMd
     *
     * @return \AppBundle\Entity\Medicos 
     */
    public function getMclinMd()
    {
        return $this->mclinMd;
    }

    /**
     * Set mclinClin
     *
     * @param \AppBundle\Entity\Clinicas $mclinClin
     * @return Metaclinicas
     */
    public function setMclinClin(\AppBundle\Entity\Clinicas $mclinClin = null)
    {
        $this->mclinClin = $mclinClin;

        return $this;
    }

    /**
     * Get mclinClin
     *
     * @return \AppBundle\Entity\Clinicas 
     */
    public function getMclinClin()
    {
        return $this->mclinClin;
    }
}
