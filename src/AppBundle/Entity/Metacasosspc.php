<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Metacasosspc
 *
 * @ORM\Table(name="metacasosspc", indexes={@ORM\Index(name="mcasespc_case_id", columns={"mcasespc_case_id"}), @ORM\Index(name="mcasespc_spc_id", columns={"mcasespc_spc_id"})})
 * @ORM\Entity
 */
class Metacasosspc
{
    /**
     * @var integer
     *
     * @ORM\Column(name="mcasespc_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $mcasespcId;

    /**
     * @var \Especialidad
     *
     * @ORM\ManyToOne(targetEntity="Especialidad")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="mcasespc_spc_id", referencedColumnName="spc_id")
     * })
     */
    private $mcasespcSpc;

    /**
     * @var \Casos
     *
     * @ORM\ManyToOne(targetEntity="Casos")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="mcasespc_case_id", referencedColumnName="case_id")
     * })
     */
    private $mcasespcCase;



    /**
     * Get mcasespcId
     *
     * @return integer 
     */
    public function getMcasespcId()
    {
        return $this->mcasespcId;
    }

    /**
     * Set mcasespcSpc
     *
     * @param \AppBundle\Entity\Especialidad $mcasespcSpc
     * @return Metacasosspc
     */
    public function setMcasespcSpc(\AppBundle\Entity\Especialidad $mcasespcSpc = null)
    {
        $this->mcasespcSpc = $mcasespcSpc;

        return $this;
    }

    /**
     * Get mcasespcSpc
     *
     * @return \AppBundle\Entity\Especialidad 
     */
    public function getMcasespcSpc()
    {
        return $this->mcasespcSpc;
    }

    /**
     * Set mcasespcCase
     *
     * @param \AppBundle\Entity\Casos $mcasespcCase
     * @return Metacasosspc
     */
    public function setMcasespcCase(\AppBundle\Entity\Casos $mcasespcCase = null)
    {
        $this->mcasespcCase = $mcasespcCase;

        return $this;
    }

    /**
     * Get mcasespcCase
     *
     * @return \AppBundle\Entity\Casos 
     */
    public function getMcasespcCase()
    {
        return $this->mcasespcCase;
    }
}
