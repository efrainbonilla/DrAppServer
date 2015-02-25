<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Metacasosuser
 *
 * @ORM\Table(name="metacasosuser", indexes={@ORM\Index(name="mcaseuser_case_id", columns={"mcaseuser_case_id"}), @ORM\Index(name="mcaseuser_user_id", columns={"mcaseuser_user_id"})})
 * @ORM\Entity
 */
class Metacasosuser
{
    /**
     * @var integer
     *
     * @ORM\Column(name="mcaseuser_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $mcaseuserId;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="mcaseuser_user_id", referencedColumnName="user_id")
     * })
     */
    private $mcaseuserUser;

    /**
     * @var \Casos
     *
     * @ORM\ManyToOne(targetEntity="Casos")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="mcaseuser_case_id", referencedColumnName="case_id")
     * })
     */
    private $mcaseuserCase;



    /**
     * Get mcaseuserId
     *
     * @return integer 
     */
    public function getMcaseuserId()
    {
        return $this->mcaseuserId;
    }

    /**
     * Set mcaseuserUser
     *
     * @param \AppBundle\Entity\User $mcaseuserUser
     * @return Metacasosuser
     */
    public function setMcaseuserUser(\AppBundle\Entity\User $mcaseuserUser = null)
    {
        $this->mcaseuserUser = $mcaseuserUser;

        return $this;
    }

    /**
     * Get mcaseuserUser
     *
     * @return \AppBundle\Entity\User 
     */
    public function getMcaseuserUser()
    {
        return $this->mcaseuserUser;
    }

    /**
     * Set mcaseuserCase
     *
     * @param \AppBundle\Entity\Casos $mcaseuserCase
     * @return Metacasosuser
     */
    public function setMcaseuserCase(\AppBundle\Entity\Casos $mcaseuserCase = null)
    {
        $this->mcaseuserCase = $mcaseuserCase;

        return $this;
    }

    /**
     * Get mcaseuserCase
     *
     * @return \AppBundle\Entity\Casos 
     */
    public function getMcaseuserCase()
    {
        return $this->mcaseuserCase;
    }
}
