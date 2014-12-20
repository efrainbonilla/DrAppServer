<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Metapacientes
 *
 * @ORM\Table(name="metapacientes", indexes={@ORM\Index(name="mpat_case_id", columns={"mpat_case_id"}), @ORM\Index(name="mpat_pat_id", columns={"mpat_pat_id"})})
 * @ORM\Entity
 */
class Metapacientes
{
    /**
     * @var integer
     *
     * @ORM\Column(name="mpat_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $mpatId;

    /**
     * @var \Pacientes
     *
     * @ORM\ManyToOne(targetEntity="Pacientes")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="mpat_pat_id", referencedColumnName="pat_id")
     * })
     */
    private $mpatPat;

    /**
     * @var \Casos
     *
     * @ORM\ManyToOne(targetEntity="Casos")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="mpat_case_id", referencedColumnName="case_id")
     * })
     */
    private $mpatCase;



    /**
     * Get mpatId
     *
     * @return integer 
     */
    public function getMpatId()
    {
        return $this->mpatId;
    }

    /**
     * Set mpatPat
     *
     * @param \AppBundle\Entity\Pacientes $mpatPat
     * @return Metapacientes
     */
    public function setMpatPat(\AppBundle\Entity\Pacientes $mpatPat = null)
    {
        $this->mpatPat = $mpatPat;

        return $this;
    }

    /**
     * Get mpatPat
     *
     * @return \AppBundle\Entity\Pacientes 
     */
    public function getMpatPat()
    {
        return $this->mpatPat;
    }

    /**
     * Set mpatCase
     *
     * @param \AppBundle\Entity\Casos $mpatCase
     * @return Metapacientes
     */
    public function setMpatCase(\AppBundle\Entity\Casos $mpatCase = null)
    {
        $this->mpatCase = $mpatCase;

        return $this;
    }

    /**
     * Get mpatCase
     *
     * @return \AppBundle\Entity\Casos 
     */
    public function getMpatCase()
    {
        return $this->mpatCase;
    }
}
