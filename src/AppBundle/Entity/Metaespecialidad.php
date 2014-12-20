<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Metaespecialidad
 *
 * @ORM\Table(name="metaespecialidad", indexes={@ORM\Index(name="mspc_md_id", columns={"mspc_md_id"}), @ORM\Index(name="mspc_spc_id", columns={"mspc_spc_id"})})
 * @ORM\Entity
 */
class Metaespecialidad
{
    /**
     * @var integer
     *
     * @ORM\Column(name="mspc_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $mspcId;

    /**
     * @var \Medicos
     *
     * @ORM\ManyToOne(targetEntity="Medicos")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="mspc_md_id", referencedColumnName="md_id")
     * })
     */
    private $mspcMd;

    /**
     * @var \Especialidad
     *
     * @ORM\ManyToOne(targetEntity="Especialidad")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="mspc_spc_id", referencedColumnName="spc_id")
     * })
     */
    private $mspcSpc;



    /**
     * Get mspcId
     *
     * @return integer 
     */
    public function getMspcId()
    {
        return $this->mspcId;
    }

    /**
     * Set mspcMd
     *
     * @param \AppBundle\Entity\Medicos $mspcMd
     * @return Metaespecialidad
     */
    public function setMspcMd(\AppBundle\Entity\Medicos $mspcMd = null)
    {
        $this->mspcMd = $mspcMd;

        return $this;
    }

    /**
     * Get mspcMd
     *
     * @return \AppBundle\Entity\Medicos 
     */
    public function getMspcMd()
    {
        return $this->mspcMd;
    }

    /**
     * Set mspcSpc
     *
     * @param \AppBundle\Entity\Especialidad $mspcSpc
     * @return Metaespecialidad
     */
    public function setMspcSpc(\AppBundle\Entity\Especialidad $mspcSpc = null)
    {
        $this->mspcSpc = $mspcSpc;

        return $this;
    }

    /**
     * Get mspcSpc
     *
     * @return \AppBundle\Entity\Especialidad 
     */
    public function getMspcSpc()
    {
        return $this->mspcSpc;
    }
}
