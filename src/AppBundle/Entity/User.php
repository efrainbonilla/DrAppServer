<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use JMS\Serializer\Annotation\Accessor;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\Type;

/**
 * User
 *
 * @ORM\Table(name="usuarios")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\UserRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ExclusionPolicy("all")
 */
class User extends BaseUser
{
    /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     * @Expose
     */
    protected $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="update_at", type="datetime", nullable=false)
     * @Expose
     */
    protected $updateAt;

    /**
     * @var Array
     *
     * @ORM\OneToMany(targetEntity="Casos", mappedBy="caseUser")
     */
    protected $casos;

    /**
     * @Accessor("getUsername")
     * @Expose
     * @SerializedName("username")
     * @Type("string")
     */
    private $__username;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Hook on pre-persist operations
     *
     * @ORM\PrePersist
     */
    public function prePersist()
    {
        $this->createdAt = new \DateTime;
        $this->updateAt = new \DateTime;
    }

    /**
     * Hook on pre-update operations
     *
     * @ORM\PreUpdate
     */
    public function preUpdate()
    {
        $this->updateAt = new \DateTime;
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Get updateAt
     *
     * @return \DateTime 
     */
    public function getUpdateAt()
    {
        return $this->updateAt;
    }

    /**
     * Add casos
     *
     * @param \AppBundle\Entity\Casos $casos
     * @return User
     */
    public function addCaso(\AppBundle\Entity\Casos $casos)
    {
        $this->casos[] = $casos;

        return $this;
    }

    /**
     * Remove casos
     *
     * @param \AppBundle\Entity\Casos $casos
     */
    public function removeCaso(\AppBundle\Entity\Casos $casos)
    {
        $this->casos->removeElement($casos);
    }

    /**
     * Get casos
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getCasos()
    {
        return $this->casos;
    }
}
